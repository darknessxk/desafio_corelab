<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TodoItemController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::group([
    'middleware' => ['auth:api']
], function () {
    Route::apiResource('/todo', TodoItemController::class);
});
