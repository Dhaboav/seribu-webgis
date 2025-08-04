<?php

use App\Http\Controllers\Api\DatasController;
use App\Http\Controllers\Api\LocationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api', 'last_use_api_token')->group(function() {
    Route::post('create-marker', [LocationController::class, 'store']);
    Route::delete('delete-marker', [LocationController::class, 'destroy']);

    Route::post('upload-data', [DatasController::class, 'store']);
    Route::delete('delete-data', [DatasController::class, 'destroy']);
});
