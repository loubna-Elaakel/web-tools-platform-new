<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIEmailController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'topic' => 'required|string|max:5000',
        ]);

        try {

            $prompt = "Write a professional and natural email based on the following topic.

Topic:
" . $request->topic . "

Requirements:
- Write a clear and professional email.
- Include a suitable greeting.
- Explain the topic clearly.
- Include a suitable closing.
- Return only the email text.
- Do not add explanations outside the email.";

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
                    'message' => 'No email generated.',
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