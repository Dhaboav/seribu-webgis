<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Location;
use App\Models\Datas;

uses(RefreshDatabase::class);

it('returns a successful response', function () {
    $user = User::factory()->create();
    $location = Location::factory()->create([
        'coords' => '-7.123,109.123',
        'name' => 'Test Location',
    ]);

    Datas::factory()->create([
        'user_id' => $user->id,
        'loc_id' => $location->id,
        'file_path' => 'uploads/test.jpg',
        'water_lvl' => 2.0,
        'is_trash' => false,
    ]);

    $response = $this->get('/');
    $response->assertStatus(200);
});
