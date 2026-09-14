<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Dskripchenko\PhpPdf\Compat\Fpdi;

class MergePdfController extends Controller
{
    public function merge(Request $request)
    {
        $request->validate([
            'pdfs' => 'required|array|min:2',
            'pdfs.*' => 'required|file|mimes:pdf|max:20480',
        ]);

        try {

            $pdf = new Fpdi();

            foreach ($request->file('pdfs') as $file) {

                $pageCount = $pdf->setSourceFile(
                    $file->getPathname()
                );

                for ($pageNumber = 1; $pageNumber <= $pageCount; $pageNumber++) {

                    $templateId = $pdf->importPage($pageNumber);

                    $size = $pdf->getTemplateSize($templateId);

                    // Determine page orientation
                    $orientation = $size['width'] > $size['height']
                        ? 'L'
                        : 'P';

                    $pdf->AddPage(
                        $orientation,
                        [
                            $size['width'],
                            $size['height']
                        ]
                    );

                    $pdf->useTemplate($templateId);
                }
            }

            $output = $pdf->Output('S');

            return response($output, 200)
                ->header('Content-Type', 'application/pdf')
                ->header(
                    'Content-Disposition',
                    'attachment; filename="merged.pdf"'
                );

        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'PDF merging failed.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}