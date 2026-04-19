<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $users = DB::table('users')
            ->whereNotNull('provider')
            ->whereNotNull('provider_id')
            ->get();

        foreach ($users as $user) {
            DB::table('socials')->insert([
                'user_id' => $user->id,
                'provider' => $user->provider,
                'provider_id' => $user->provider_id,
                'avatar' => $user->avatar,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ]);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['provider', 'provider_id', 'avatar']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('provider')->nullable()->after('password');
            $table->string('provider_id')->nullable()->after('provider');
            $table->string('avatar')->nullable()->after('provider_id');
        });

        $socials = DB::table('socials')->get();

        foreach ($socials as $social) {
            DB::table('users')
                ->where('id', $social->user_id)
                ->update([
                    'provider' => $social->provider,
                    'provider_id' => $social->provider_id,
                    'avatar' => $social->avatar,
                ]);
        }

        DB::table('socials')->truncate();
    }
};
