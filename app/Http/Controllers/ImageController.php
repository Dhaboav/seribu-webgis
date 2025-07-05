<?php

namespace App\Http\Controllers;

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
            'file' => 'required|image|mimes:jpeg|max:2048'
        ]);

        // Generate filename
        $prefix = env('UPLOAD_FILENAME', 'gemastik');
        $extension = $request->file('file')->getClientOriginalExtension();
        $fileName = $prefix . '.' . $extension;

        // Store file
        $path = $request->file('file')->storeAs('uploads', $fileName, 'public');

        // Return JSON response with public URL
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
