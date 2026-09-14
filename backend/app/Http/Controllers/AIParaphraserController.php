<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIParaphraserController extends Controller
{
    public function paraphrase(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:10000',
        ]);

        try {

            $response = Http::timeout(60)
                ->withHeaders([
                    'x-goog-api-key' => env('GEMINI_API_KEY'),
                    'Content-Type' => 'application/json',
                ])
                ->post(
                    'https://generativelanguage.googleapis.com/v1beta/interactions',
                    [
                        'model' => 'gemini-3.6-flash',
                        'input' => 'Paraphrase the following text while keeping exactly the same meaning. Make it natural, clear and grammatically correct. Return only the paraphrased text:

' . $request->text,
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
                    'message' => 'No paraphrased text returned.',
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