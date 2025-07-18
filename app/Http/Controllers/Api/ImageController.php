<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;

class ImageController extends Controller
{
    /**
     * Handle an incoming uploading image request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request){

        $request->validate([
            'id_lokasi'=>'required|integer|exists:locations,id',
            'file' => 'required|image|mimes:jpg|max:2048'
        ]);

        $id_lokasi = $request->input('id_lokasi');

        $extension = $request->file('file')->getClientOriginalExtension();
        $fileName = $id_lokasi . '.' . $extension;

        $path = $request->file('file')->storeAs('uploads', $fileName, 'public');

        // Response JSON
        return response()->json([
            'user' => $request->user()->name,
            'message' => 'Image uploaded successfully.',
            'path' => Storage::url($path),
        ], 201);
    }

    public function destroy (Request $request) {
        $request->validate([
            'path' => 'required|string',
        ]); 

        // Ensure the path starts with the expected prefix
        $publicPrefix = '/storage/uploads/';
        if (!str_starts_with($request->path, $publicPrefix)) {
            return response()->json([
                'message' => 'Invalid file path.',
            ], 400);
        }

        // Convert public URL to relative storage path
        $relativePath = str_replace('/storage/', '', $request->path);
        
        // Check existence
        $disk = Storage::disk('public');
        if (!$disk->exists($relativePath)) {
            return response()->json([
                'message' => 'File not found.',
            ], 404);
        }

        // Delete the file
        $disk->delete($relativePath);

        return response()->json([
            'user' => $request->user()->name,
            'message' => 'Image deleted successfully.',
        ]);
    }
}
