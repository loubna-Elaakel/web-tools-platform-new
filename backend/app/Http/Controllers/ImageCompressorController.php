<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageCompressorController extends Controller
{
    public function compress(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
        ]);

        try {
            $file = $request->file('image');

            $manager = new ImageManager(
                new Driver()
            );

            $image = $manager->read(
                $file->getPathname()
            );

            // Resize
            $image->scaleDown(
                width: 800,
                height: 800
            );

            // Compress to JPEG
            $encoded = $image->toJpeg(
                quality: 70
            );

            return response(
                $encoded->toString(),
                200
            )
                ->header('Content-Type', 'image/jpeg')
                ->header(
                    'Content-Disposition',
                    'inline; filename="compressed.jpg"'
                )
                ->header('Access-Control-Allow-Origin', '*');

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Image compression failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}