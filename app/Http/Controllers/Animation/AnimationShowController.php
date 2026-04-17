<?php

namespace App\Http\Controllers\Animation;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimationShowController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $animation = $request->route('animation');

        return match ($animation) {
            'text-animator' => Inertia::render('animations/text-animator'),
            'animate-css' => Inertia::render('animations/animate-css'),
            'canvas' => Inertia::render('animations/canvas'),
            default => abort(404),
        };
    }
}
