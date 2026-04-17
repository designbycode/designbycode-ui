<?php

use App\Http\Controllers\Animation\AnimationIndexController;
use App\Http\Controllers\Animation\AnimationShowController;
use App\Http\Controllers\HomePageIndexController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::get('/', HomePageIndexController::class)->name('home');
Route::get('/animations', AnimationIndexController::class)->name('animations.index');
Route::get('/animations/{animation}', AnimationShowController::class)->name('animations.show');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
