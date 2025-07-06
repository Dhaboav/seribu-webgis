<?php

use App\Http\Controllers\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:api', 'last_use_api_token')->group(function () {
    Route::post('image', [ImageController::class, 'store']);
    Route::delete('image', [ImageController::class, 'destroy']);
});
