<?php

use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

/**
 * Test: User can get token
 */
test('user can get token', function() {
    $user = User::factory()->create([
        'api_token'            => 'sampletoken',
        'api_token_expires_at' => now()->addDays(30),
    ]);

    $response = $this
        ->actingAs($user)
        ->getJson(route('token.get'));

    $response->assertOk();
    $response->assertJsonStructure([
        'token',
    ]);
});

/**
 * Test: User can create token
 */
test('user can create token', function() {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->postJson(route('token.request'));

    $response->assertOk();
    $response->assertJsonStructure([
        'token',
        'expires_at',
    ]);
});

/**
 * Test: User can delete token
 */
test('user can delete token', function() {
    $user = User::factory()->create([
        'api_token' => 'tobedeleted',
    ]);

    $response = $this
        ->actingAs($user)
        ->postJson(route('token.delete'));

    $response->assertOk();
    $response->assertJson([
        'message' => 'API token revoked successfully.',
    ]);
});
