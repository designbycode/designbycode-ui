<?php

use App\Http\Controllers\Animation\AnimationIndexController;
use App\Http\Controllers\Animation\AnimationShowController;
use App\Http\Controllers\HomePageIndexController;
use App\Http\Controllers\RegistryController;
use App\Http\Controllers\Socialite\AuthCallbackController;
use App\Http\Controllers\Socialite\AuthIndexController;
use App\Http\Controllers\Socialite\AuthRedirectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomePageIndexController::class)->name('home');
Route::get('/animations', AnimationIndexController::class)->name('animations.index');
Route::get('/animations/{animation}', AnimationShowController::class)->name('animations.show');
Route::get('/r/{name}.json', RegistryController::class)->name('registry');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['guest'])->group(function () {
    Route::get('/auth', AuthIndexController::class)->name('auth.index');
    Route::get('/auth/callback/{provider}', AuthCallbackController::class)->name('auth.callback');
    Route::get('/auth/{provider}', AuthRedirectController::class)->name('auth.redirect');
});

require __DIR__.'/settings.php';
