<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use Illuminate\Support\Str;

use App\Http\Controllers\Controller;

use App\Models\Datas;

use Illuminate\Support\Facades\Storage;


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

        $url = Storage::disk('public')->url($path);

        return response()->json([
            'message' => 'Data added successfully',
            'file_url' => $url
        ], 201);
    }

    public function destroy(Request $request) {
        $request->validate([
            'data_id' => 'required|integer|exists:datas,id'
        ]);

        $data = Datas::findOrFail($request->data_id);

        $relativePath = str_replace('/storage/', '', $data->file_path);

        $disk = Storage::disk('public');
        if (!$disk->exists($relativePath)) {
            return response()->json([
                'message' => 'File not found.',
            ], 404);
        }

        // Delete the file
        $disk->delete($relativePath);

        // Delete the database record
        $data->delete();

        // Respond with success
        return response()->json(['message' => 'Data and associated file deleted successfully.']);
    }
}
