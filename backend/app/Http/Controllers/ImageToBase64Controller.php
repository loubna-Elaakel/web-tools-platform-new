<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageToBase64Controller extends Controller
{
    public function convert(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
        ]);

        try {

            $file = $request->file('image');

            $base64 = base64_encode(
                file_get_contents($file->getPathname())
            );

            $mimeType = $file->getMimeType();

            $dataUrl = 'data:' . $mimeType . ';base64,' . $base64;

            return response()->json([
                'success' => true,
                'filename' => $file->getClientOriginalName(),
                'mime_type' => $mimeType,
                'base64' => $base64,
                'data_url' => $dataUrl,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Image conversion failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}