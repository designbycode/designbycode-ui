<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class AuthCallbackController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $provider): RedirectResponse
    {
        $socialUser = Socialite::driver($provider)->user();

        $user = User::updateOrCreate(
            [
                'provider' => $provider,
                'provider_id' => $socialUser->getId(),
            ],
            [
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'email' => $socialUser->getEmail(),
                'avatar' => $socialUser->getAvatar(),
            ]
        );

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
