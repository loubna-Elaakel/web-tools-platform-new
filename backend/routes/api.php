<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BackgroundRemovalController;
use App\Http\Controllers\AIParaphraserController;
use App\Http\Controllers\AIEmailController;
use App\Http\Controllers\AIProductController;
use App\Http\Controllers\AIResumeController;
use App\Http\Controllers\ImageCompressorController;
use App\Http\Controllers\ImageToBase64Controller;
use App\Http\Controllers\MergePdfController;

Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel API is working!'
    ]);
});

Route::post('/remove-background', [BackgroundRemovalController::class, 'remove']);

Route::post('/paraphrase', [AIParaphraserController::class, 'paraphrase']);

Route::post(
    '/ai-email',
    [AIEmailController::class, 'generate']
);

Route::post(
    '/ai-product',
    [AIProductController::class, 'generate']
);

Route::post(
    '/ai-resume',
    [AIResumeController::class, 'generate']
);

Route::post('/compress-image', [ImageCompressorController::class, 'compress']);

Route::post(
    '/image-to-base64',
    [ImageToBase64Controller::class, 'convert']
);

Route::post(
    '/merge-pdf',
    [MergePdfController::class, 'merge']
);