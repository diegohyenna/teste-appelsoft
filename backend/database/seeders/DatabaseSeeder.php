<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        if (User::where('email', 'user@email.com')->count() == 0)
            User::factory()->create([
                'name' => 'Joe Doe',
                'email' => 'user@email.com',
                'password' => Hash::make('123456')
            ]);
    }
}
