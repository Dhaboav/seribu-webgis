<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function(Blueprint $table) {
            $table->string('api_token', 24)->unique()->nullable();
            $table->timestamp('api_token_last_used_at')->nullable();
            $table->timestamp('api_token_expires_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn([
                'api_token',
                'api_token_last_used_at',
                'api_token_expires_at',
            ]);
        });
    }
};
