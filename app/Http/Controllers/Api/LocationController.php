<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Location;

class LocationController extends Controller
{
    /**
     * Handle an incoming uploading image request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'    => 'required|string',
            'coords'  => 'required|string',
            'user_id' => 'required|integer|exists:users,id'
        ]);

        $location = Location::create($request->only(['name', 'coords', 'user_id']));

        return response()->json([
            'message' => 'Location added successfully'
        ], 201);
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required|integer|exists:locations,id'
        ]);

        Location::destroy($request->id);

        return response()->json([
            'message' => 'Location deleted successfully'
        ]);
    }
}
