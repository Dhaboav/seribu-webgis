<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class LocationFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name'    => $this->faker->city,
            'coords'  => $this->faker->latitude . ',' . $this->faker->longitude,
            'user_id' => User::factory()
        ];
    }
}
