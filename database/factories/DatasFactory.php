<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

class DatasFactory extends Factory
{
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'loc_id' => Location::factory(),
            'is_trash' => $this->faker->boolean,
            'water_lvl' => $this->faker->randomFloat(2, 0, 5),
            'file_path' => 'uploads/' . $this->faker->uuid . '.jpg',
            'time' => now(),
        ];
    }
}
