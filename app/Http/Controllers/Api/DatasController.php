<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Models\Datas;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class DatasController extends Controller
{
    /**
     * Handle an incoming uploading image request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id'   => 'required|integer|exists:users,id',
            'loc_id'    => 'required|integer|exists:locations,id',
            'is_trash'  => 'required|boolean',
            'water_lvl' => 'required|numeric',
            'file'      => 'required|image|mimes:jpg|max:2048'
        ]);

        // File preprocessing
        $randomName = Str::random(13);
        $ext        = $request->file('file')->getClientOriginalExtension();
        $fileName   = $randomName . '.' . $ext;
        $path       = $request->file('file')->storeAs('uploads', $fileName, 'public');

        $data = Datas::create([
            'user_id'   => $request->user_id,
            'loc_id'    => $request->loc_id,
            'is_trash'  => $request->is_trash,
            'water_lvl' => $request->water_lvl,
            'file_path' => $path,
        ]);

        // Send Telegram message if the data is marked as trash
        if ($request->is_trash) {
            $this->sendTelegramMessage($data);
        }

        $url = Storage::disk('public')->url($path);

        return response()->json([
            'message'  => 'Data added successfully',
            'file_url' => $url
        ], 201);
    }

    public function destroy(Request $request)
    {
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

    /**
     * Send a Telegram message when the data is marked as trash.
     *
     * @param \App\Models\Datas $data
     */
    protected function sendTelegramMessage($data)
    {
        // Fetch location name
        $locationName = $data->location ? $data->location->name : 'Unknown Location';
        $userName     = $data->user ? $data->user->name : 'Unknown User';

        // Construct the message
        $message = "⚠️ Peringatan Sampah! ⚠️\n\n";
        $message .= "Pengguna: {$userName}\n";
        $message .= "Lokasi: {$locationName}\n";  // Use location name instead of ID
        $message .= "Tinggi Air: {$data->water_lvl} CM\n";
        $message .= "Waktu: " . now();

        // Fetch bot token and chat ID from the config file
        $botToken = config('telegram.bot_token');
        $chatId   = config('telegram.chat_id');

        // Get the local file path
        $filePath = storage_path("app/public/{$data->file_path}");

        // Send the file using Telegram Bot API
        $response = Http::withOptions([
            'verify' => false // Disable SSL verification
        ])->attach(
            'document',
            file_get_contents($filePath),
            basename($filePath)
        )->post("https://api.telegram.org/bot{$botToken}/sendDocument", [
            'chat_id' => $chatId,
            'caption' => $message,
        ]);

        // Check if the request was successful
        if ($response->failed()) {
            // Log the failure (optional)
            \Log::error('Failed to send message to Telegram: ' . $response->body());
        }
    }
}
