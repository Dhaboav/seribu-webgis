<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\ApiTokenController;

Route::get('/', function () {
    return Inertia::render('welcome');
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
