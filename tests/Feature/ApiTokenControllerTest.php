<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTokenControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_get_token()
    {
        $user = User::factory()->create([
            'api_token' => hash('sha256', 'sampletoken'),
            'api_token_expires_at' => now()->addDays(30),
        ]);

        $response = $this
            ->actingAs($user)
            ->getJson(route('token.get'));

        $response->assertOk();
        $response->assertJsonStructure([
            'token',
        ]);
    }

    public function test_user_can_create_token()
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson(route('token.request'));

        $response->assertOk();
        $response->assertJsonStructure([
            'token',
            'expires_at',
        ]);
    }

    public function test_user_can_delete_token()
    {
        $user = User::factory()->create([
            'api_token' => hash('sha256', 'tobedeleted'),
        ]);

        $response = $this
            ->actingAs($user)
            ->postJson(route('token.delete'));

        $response->assertOk();
        $response->assertJson([
            'message' => 'API token revoked successfully.',
        ]);
    }
}
