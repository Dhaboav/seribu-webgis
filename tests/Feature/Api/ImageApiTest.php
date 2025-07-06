<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

/*
|--------------------------------------------------------------------------
| Upload Tests
|--------------------------------------------------------------------------
*/

beforeEach(function () {
    Storage::fake('public');
});

test('upload image successfully', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    $response = $this->postJson('/api/image', [
        'file' => UploadedFile::fake()->create('test.jpeg', 10, 'image/jpeg'),
    ], [
        'Authorization' => "Bearer $token",
    ]);

    $response->assertStatus(201)
        ->assertJsonStructure([
            'user',
            'message',
            'path',
        ]);

    Storage::disk('public')->assertExists('uploads/gemastik.jpeg');
});

test('upload non-image file', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    $response = $this->postJson('/api/image', [
        'file' => UploadedFile::fake()->create('document.pdf', 10, 'application/pdf'),
    ], [
        'Authorization' => "Bearer $token",
    ]);

    $response->assertStatus(422)
        ->assertJsonValidationErrors(['file']);
});

test('upload image with invalid token', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    $response = $this->postJson('/api/image', [
        'file' => UploadedFile::fake()->create('test.jpeg', 10, 'image/jpeg'),
    ], [
        'Authorization' => "Bearer invalid-token-123",
    ]);

    $response->assertStatus(401);
});

/*
|--------------------------------------------------------------------------
| Delete Tests
|--------------------------------------------------------------------------
*/

test('delete image successfully', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    Storage::disk('public')->put('uploads/gemastik.jpeg', 'dummy content');

    $response = $this->deleteJson('/api/image', [
        'path' => '/storage/uploads/gemastik.jpeg',
    ], [
        'Authorization' => "Bearer $token",
    ]);

    $response->assertStatus(200)
        ->assertJson([
            'user' => $user->name,
            'message' => 'Image deleted successfully.',
        ]);

    Storage::disk('public')->assertMissing('uploads/gemastik.jpeg');
});

test('delete nonexistent image', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    $response = $this->deleteJson('/api/image', [
        'path' => '/storage/uploads/nonexistent.jpeg',
    ], [
        'Authorization' => "Bearer $token",
    ]);

    $response->assertStatus(404)
        ->assertJson([
            'message' => 'File not found.',
        ]);
});

test('delete invalid path', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    $response = $this->deleteJson('/api/image', [
        'path' => '/invalid/path/file.jpeg',
    ], [
        'Authorization' => "Bearer $token",
    ]);

    $response->assertStatus(400)
        ->assertJson([
            'message' => 'Invalid file path.',
        ]);
});

test('delete image with invalid token', function () {
    $user = User::factory()->create();
    $token = Str::random(60);
    $user->update([
        'api_token' => $token,
        'api_token_expires_at' => now()->addDays(7),
    ]);

    Storage::disk('public')->put('uploads/gemastik.jpeg', 'dummy content');

    $response = $this->deleteJson('/api/image', [
        'path' => '/storage/uploads/gemastik.jpeg',
    ], [
        'Authorization' => "Bearer invalid-token-123",
    ]);

    $response->assertStatus(401);
    Storage::disk('public')->assertExists('uploads/gemastik.jpeg');
});
