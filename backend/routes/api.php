<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FinancialTransactionController;

Route::get('/', function (Request $request) {
    return "<h1>Api funcionando</h1><br>Algumas rotas:<br><ul><li>POST <a href='/api/login'>/api/login</a></li>
    <li>POST <a href='/api/logout'>/api/logout</a></li>
    <li>POST <a href='/api/me'>/api/me</a></li>
    </ul>";
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/logout/{id}', [AuthController::class, 'logout'])->middleware('auth:api')->name('logout');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:api')->name('me');
Route::get('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api')->name('refresh');

Route::get('/transacoes', [FinancialTransactionController::class, 'index'])->middleware('auth:api');
Route::post('/transacoes', [FinancialTransactionController::class, 'store'])->middleware('auth:api');
Route::get('/transacoes/{id}', [FinancialTransactionController::class, 'show'])->middleware('auth:api');
Route::put('/transacoes/{id}', [FinancialTransactionController::class, 'update'])->middleware('auth:api');
Route::delete('/transacoes/{id}', [FinancialTransactionController::class, 'destroy'])->middleware('auth:api');
Route::get('/resumo', [FinancialTransactionController::class, 'resume'])->middleware('auth:api');
