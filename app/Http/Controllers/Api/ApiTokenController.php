<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Http\JsonResponse;

class ApiTokenController extends Controller
{
    /**
     * Retrieve the current user's API token (hashed).
     *
     * @param  \Illuminate\Http\Request      $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'token' => $user->api_token,
        ]);
    }

    /**
     * Generate and store a new API token for the authenticated user.
     *
     * @param  \Illuminate\Http\Request      $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        $plainToken = Str::random(24);

        $user->forceFill([
            'api_token'              => $plainToken,
            'api_token_expires_at'   => null,
            'api_token_last_used_at' => null,
        ])->save();

        return response()->json([
            'token'      => $plainToken,
            'expires_at' => $user->api_token_expires_at,
        ]);
    }

    /**
     * Revoke the current user's API token.
     *
     * @param  \Illuminate\Http\Request      $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        $user = $request->user();

        $user->forceFill([
            'api_token'              => null,
            'api_token_expires_at'   => null,
            'api_token_last_used_at' => null,
        ])->save();

        return response()->json([
            'message' => 'API token revoked successfully.',
        ]);
    }
}
