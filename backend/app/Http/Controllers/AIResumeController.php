<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class AIResumeController extends Controller
{
    public function generate(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'job_title' => 'required|string|max:300',
            'skills' => 'required|string|max:3000',
            'experience' => 'nullable|string|max:5000',
            'education' => 'nullable|string|max:5000',
        ]);

        try {

            $prompt = "Create professional resume content based ONLY on the information provided below.

Name:
" . $request->name . "

Job Title:
" . $request->job_title . "

Skills:
" . $request->skills . "

Experience:
" . ($request->experience ?? 'Not provided') . "

Education:
" . ($request->education ?? 'Not provided') . "

Requirements:
- Write professional resume content.
- Improve the wording and organization of the provided information.
- Do not invent jobs, companies, degrees, dates, skills, achievements, or qualifications.
- Keep the information truthful to the provided data.
- Include professional sections such as Professional Summary, Skills, Experience, and Education when information is available.
- Make the content suitable for a modern professional CV.
- Return only the resume content.
- Do not add explanations outside the resume.";

            $response = Http::connectTimeout(30)
                ->timeout(120)
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
                    'message' => 'No resume generated.',
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