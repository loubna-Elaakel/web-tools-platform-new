<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BackgroundRemovalController extends Controller
{
    public function remove(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
        ]);

        $image = $request->file('image');

        try {

            $response = Http::timeout(120)
                ->withHeaders([
                    'X-Api-Key' => env('REMOVE_BG_API_KEY'),
                ])
                ->attach(
                    'image_file',
                    file_get_contents($image->getRealPath()),
                    $image->getClientOriginalName()
                )
                ->post('https://api.remove.bg/v1.0/removebg', [
                    'size' => 'auto',
                ]);

            if (!$response->successful()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Background removal failed.',
                    'error' => $response->body(),
                ], $response->status());
            }

            return response($response->body(), 200)
                ->header('Content-Type', 'image/png');

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Server error.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}