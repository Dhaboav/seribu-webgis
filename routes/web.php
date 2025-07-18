<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Api\ApiTokenController;
use App\Models\Location;

Route::get('/', function () {
    $markers = Location::select('id', 'name', 'coords')->get();

    $images = DB::table('datas')
        ->select('loc_id', 'file_path', 'time')
        ->whereIn('loc_id', $markers->pluck('id'))
        ->orderBy('time', 'desc')
        ->get()
        ->groupBy('loc_id')
        ->map(fn ($group) => $group->first());

    return Inertia::render('welcome', [
        'markers' => $markers,
        'images' => $images->toArray(),
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
