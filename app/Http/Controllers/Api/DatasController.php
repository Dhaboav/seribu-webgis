<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

use App\Http\Controllers\Controller;

use App\Models\Datas;


class DatasController extends Controller
{
    /**
     * Handle an incoming uploading image request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request){
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'loc_id' => 'required|integer|exists:locations,id',
            'is_trash' => 'required|boolean',
            'water_lvl' => 'required|numeric',
            'file' => 'required|image|mimes:jpg|max:2048'
        ]);

        // File preproccesing
        $randomName = Str::random(13);
        $ext = $request->file('file')->getClientOriginalExtension();
        $fileName = $randomName . '.' . $ext;
        $path = $request->file('file')->storeAs('uploads', $fileName, 'public');

        $data = Datas::create([
            'user_id' => $request->user_id,
            'loc_id' => $request->loc_id,
            'is_trash' => $request->is_trash,
            'water_lvl' => $request->water_lvl,
            'file_path' => $path,
        ]);

        return response()->json([
            'message' => 'Data added successfully'
        ], 201);
    }
}
