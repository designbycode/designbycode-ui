<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ConnectedAccountsController extends Controller
{
    private const AVAILABLE_PROVIDERS = ['github', 'google'];

    public function edit(Request $request): Response
    {
        $connectedAccounts = $request->user()
            ->socials()
            ->get()
            ->map(fn (Social $social) => [
                'provider' => $social->provider,
                'provider_id' => $social->provider_id,
                'avatar' => $social->avatar,
                'connected_at' => $social->created_at->toIso8601String(),
            ]);

        $availableProviders = collect(self::AVAILABLE_PROVIDERS)
            ->filter(fn (string $provider) => ! $request->user()->hasLinkedProvider($provider))
            ->all();

        return Inertia::render('settings/connected-accounts', [
            'connectedAccounts' => $connectedAccounts,
            'availableProviders' => $availableProviders,
        ]);
    }

    public function destroy(Request $request, string $provider): RedirectResponse
    {
        if (! in_array($provider, self::AVAILABLE_PROVIDERS)) {
            return back()->withErrors(['provider' => 'Invalid provider.']);
        }

        $social = $request->user()->socials()->where('provider', $provider)->first();

        if (! $social) {
            return back()->withErrors(['provider' => 'This account is not connected.']);
        }

        if ($request->user()->socials()->count() === 1 && $request->user()->password === null) {
            return back()->withErrors([
                'provider' => 'You must set a password before disconnecting your only social account.',
            ]);
        }

        $social->delete();

        return back();
    }
}
