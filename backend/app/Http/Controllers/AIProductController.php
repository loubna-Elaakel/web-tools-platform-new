<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIProductController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
    'name' => 'required|string|max:500',
    'details' => 'nullable|string|max:5000',
]);

        try {

           $prompt = "Write a professional and attractive product description for the following product.

Product name:
" . $request->name . "

Product details:
" . ($request->details ?? 'No additional details provided.') . "

Requirements:
- Write a clear and engaging product description.
- Use only the product information provided.
- Explain the main benefits and features based on the provided information.
- Do not invent technical specifications, features, materials, measurements, prices, certifications, or performance claims.
- Make it suitable for an online store.
- Use natural and professional language.
- Return only the product description.
- Do not add explanations outside the description.";

            $response = Http::timeout(60)
                ->withHeaders([
                    'x-goog-api-key' => env('GEMINI_API_KEY'),
                    'Content-Type' => 'application/json',
                ])
                ->post(
                    'https://generativelanguage.googleapis.com/v1beta/interactions',
                    [
                        'model' => 'gemini-3.6-flash',
                        'input' => $prompt,
                    ]
                );

            if (!$response->successful()) {

                return response()->json([
                    'success' => false,
                    'message' => 'Gemini API request failed.',
                    'error' => $response->json(),
                ], $response->status());
            }

            $data = $response->json();

            $result = null;

            if (isset($data['steps'])) {

                foreach (array_reverse($data['steps']) as $step) {

                    if (
                        isset($step['type']) &&
                        $step['type'] === 'model_output' &&
                        isset($step['content'][0]['text'])
                    ) {
                        $result = $step['content'][0]['text'];
                        break;
                    }
                }
            }

            if (!$result) {

                return response()->json([
                    'success' => false,
                    'message' => 'No product description generated.',
                    'response' => $data,
                ], 500);
            }

            return response()->json([
                'success' => true,
                'result' => $result,
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Server error.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}