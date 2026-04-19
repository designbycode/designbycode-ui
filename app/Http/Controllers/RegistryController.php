<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $name)
    {

        if ($name === 'registry') {
            return response()->file(base_path('registry.json'));
        }

        abort(404);
    }
}
