<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Api\ApiTokenController;
use App\Models\Location;

use Carbon\Carbon;

Route::get('/', function () {
    $markers = Location::select('id', 'name', 'coords')->get();

    $images = DB::table('datas')
        ->select('loc_id', 'file_path', 'time')
        ->whereIn('loc_id', $markers->pluck('id'))
        ->orderBy('time', 'desc')
        ->get()
        ->groupBy('loc_id')
        ->map(fn ($group) => $group->first());

    $raw = DB::table('datas')
    ->select('file_path', 'is_trash', 'water_lvl', 'time')
    ->orderBy('time', 'desc')
    ->get();


    $grouped = $raw->groupBy(function ($row) {
        return Carbon::createFromFormat('Y-m-d H:i:s', $row->time, 'UTC')
                    ->setTimezone('Asia/Jakarta')
                    ->toDateString();
    })->map(function ($items, $date) {
        return [
            'question' => $date,
            'answer' => $items->map(function ($i) {
                return [
                    'image' => $i->file_path,
                    'time' => Carbon::createFromFormat('Y-m-d H:i:s', $i->time, 'UTC')
                                    ->setTimezone('Asia/Jakarta')
                                    ->format('H:i'),
                    'trash' => $i->is_trash ? 'Ya' : 'Tidak',
                    'height' => "{$i->water_lvl} cm",
                ];
            }),
        ];
    })->values();

    // -------------------------------------------
    // Buat data chart: time terbaru hari ini dan heightnya
    // -------------------------------------------

    $today = Carbon::now('Asia/Jakarta')->toDateString();

    // Ambil semua data hari ini (Asia/Jakarta) dan map jadi array {time, height}
    $todayData = $raw->filter(function ($row) use ($today) {
        $localDate = Carbon::createFromFormat('Y-m-d H:i:s', $row->time, 'UTC')
                    ->setTimezone('Asia/Jakarta')
                    ->toDateString();
        return $localDate === $today;
    })->map(function ($row) {
        return [
            'time' => Carbon::createFromFormat('Y-m-d H:i:s', $row->time, 'UTC')
                        ->setTimezone('Asia/Jakarta')
                        ->format('H:i'),
            'height' => (float) $row->water_lvl,
        ];
    })->sortBy('time')->values()->all();

    
    return Inertia::render('welcome', [
        'markers' => $markers,
        'images' => $images->toArray(),
        'data' => $grouped,
        'chartData' => $todayData
    ]);

})->name('home');

Route::get('/docs', function () {
    return Inertia::render('docs');
})->name('docs');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard', [
            'fullname' => auth()->user()->name
        ]);
    })->name('dashboard');

    Route::get('user-token', [ApiTokenController::class, 'index'])
        ->name('token.get');

    Route::post('create-token', [ApiTokenController::class, 'store'])
        ->name('token.request');

    Route::post('delete-token', [ApiTokenController::class, 'destroy'])
        ->name('token.delete');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
