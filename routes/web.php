<?php

use App\Http\Controllers\Animation\AnimationIndexController;
use App\Http\Controllers\Animation\AnimationShowController;
use App\Http\Controllers\HomePageIndexController;
use App\Http\Controllers\RegistryController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomePageIndexController::class)->name('home');
Route::get('/animations', AnimationIndexController::class)->name('animations.index');
Route::get('/animations/{animation}', AnimationShowController::class)->name('animations.show');
Route::get('/r/{name}.json', RegistryController::class)->name('registry');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
