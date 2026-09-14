import React, { useState } from "react";
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function MergePDF() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergedPdf, setMergedPdf] = useState(null);
  const [error, setError] = useState("");

  // =========================
  // SELECT PDF FILES
  // =========================
 const handleFiles = (e) => {
  const selectedFiles = Array.from(e.target.files || []);

  setError("");
  setMergedPdf(null);

  const pdfFiles = selectedFiles.filter(
    (file) => file.type === "application/pdf"
  );

  if (pdfFiles.length !== selectedFiles.length) {
    setError("Please select PDF files only.");
  }

  setFiles((currentFiles) => [
    ...currentFiles,
    ...pdfFiles,
  ]);

  // Reset input so the same file can be selected again if needed
  e.target.value = "";
};

  // =========================
  // REMOVE ONE FILE
  // =========================
  const removeFile = (index) => {
    setFiles((currentFiles) =>
      currentFiles.filter((_, i) => i !== index)
    );

    setMergedPdf(null);
    setError("");
  };

  // =========================
  // CLEAR ALL
  // =========================
  const clearAll = () => {
    setFiles([]);
    setMergedPdf(null);
    setError("");

    const input = document.getElementById("pdf-upload");

    if (input) {
      input.value = "";
    }
  };

  // =========================
  // MERGE PDFs
  // =========================
  const mergePDFs = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files.");
      return;
    }

    setLoading(true);
    setMergedPdf(null);
    setError("");

    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("pdfs[]", file);
      });

      console.log("Sending files:", files);
      console.log("Number of files:", files.length);

      const response = await fetch(
        "http://127.0.0.1:8000/api/merge-pdf",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("Response status:", response.status);
      console.log(
        "Content-Type:",
        response.headers.get("content-type")
      );

      // =========================
      // SERVER ERROR
      // =========================
      if (!response.ok) {
        const errorText = await response.text();

        console.error("Laravel Error:", errorText);

        throw new Error(
          `Server error (${response.status})`
        );
      }

      // =========================
      // GET PDF
      // =========================
      const blob = await response.blob();

      console.log("PDF Blob:", blob);
      console.log("PDF size:", blob.size);

      if (blob.size === 0) {
        throw new Error("The merged PDF is empty.");
      }

      const url = URL.createObjectURL(blob);

      setMergedPdf({
        blob: blob,
        url: url,
      });

      console.log("PDF merged successfully!");

    } catch (err) {
      console.error("MERGE ERROR:", err);

      setError(
        err.message ||
        "Something went wrong while merging PDFs."
      );

    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DOWNLOAD
  // =========================
  const downloadPDF = () => {
    if (!mergedPdf) return;

    const url = URL.createObjectURL(mergedPdf.blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "merged.pdf";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="Merge PDF Online - Combine PDF Files"
        description="Merge multiple PDF files into one PDF document online quickly and easily."
      />

      <BackHome />

      <div className="min-h-screen bg-gray-50 py-10 px-4">

        <div className="max-w-4xl mx-auto">

          {/* =========================
              HEADER
          ========================= */}

          <div className="text-center mb-10">

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Merge PDF
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Combine multiple PDF files into one single PDF document.
            </p>

          </div>


          {/* =========================
              MAIN CARD
          ========================= */}

          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

            {/* =========================
                UPLOAD AREA
            ========================= */}

            <label
              htmlFor="pdf-upload"
              className="block cursor-pointer"
            >

              <div
                className="
                  border-2
                  border-dashed
                  border-gray-300
                  rounded-2xl
                  p-10
                  md:p-14
                  text-center
                  hover:border-blue-500
                  hover:bg-blue-50
                  transition
                  duration-200
                "
              >

                <div className="text-6xl mb-5">
                  📄
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Select PDF Files
                </h2>

                <p className="text-gray-500">
                  Click here to choose two or more PDF files
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  PDF files only • Maximum 20 MB per file
                </p>

              </div>

            </label>

            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFiles}
              className="hidden"
            />


            {/* =========================
                ERROR
            ========================= */}

            {error && (
              <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4">

                <p className="font-medium">
                  ❌ {error}
                </p>

              </div>
            )}


            {/* =========================
                FILE LIST
            ========================= */}

            {files.length > 0 && (

              <div className="mt-8">

                <div className="flex items-center justify-between mb-4">

                  <h2 className="text-xl font-bold text-gray-900">
                    Selected Files
                  </h2>

                  <span className="text-sm text-gray-500">
                    {files.length} PDF
                    {files.length > 1 ? "s" : ""}
                  </span>

                </div>


                {/* FILES */}

                <div className="space-y-3">

                  {files.map((file, index) => (

                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        p-4
                      "
                    >

                      {/* LEFT */}

                      <div className="flex items-center gap-3 min-w-0">

                        <div
                          className="
                            w-11
                            h-11
                            bg-red-100
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            text-xl
                            flex-shrink-0
                          "
                        >
                          📄
                        </div>


                        <div className="min-w-0">

                          <p className="font-medium text-gray-800 truncate">

                            {index + 1}. {file.name}

                          </p>

                          <p className="text-sm text-gray-500 mt-1">

                            {(file.size / 1024 / 1024).toFixed(2)} MB

                          </p>

                        </div>

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="
                          text-red-500
                          hover:text-red-700
                          font-medium
                          text-sm
                          flex-shrink-0
                        "
                      >
                        Remove
                      </button>

                    </div>

                  ))}

                </div>


                {/* =========================
                    BUTTONS
                ========================= */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

                  {/* MERGE */}

                  <button
                    type="button"
                    onClick={mergePDFs}
                    disabled={loading || files.length < 2}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      disabled:bg-blue-300
                      disabled:cursor-not-allowed
                      text-white
                      font-semibold
                      py-3.5
                      px-6
                      rounded-xl
                      transition
                    "
                  >

                    {loading ? (

                      <span className="flex items-center justify-center gap-2">

                        <span className="animate-spin">
                          ⏳
                        </span>

                        Merging PDFs...

                      </span>

                    ) : (

                      "Merge PDFs"

                    )}

                  </button>


                  {/* CLEAR */}

                  <button
                    type="button"
                    onClick={clearAll}
                    disabled={loading}
                    className="
                      border
                      border-gray-300
                      hover:bg-gray-100
                      disabled:opacity-50
                      text-gray-700
                      font-semibold
                      py-3.5
                      px-6
                      rounded-xl
                      transition
                    "
                  >
                    Clear All
                  </button>

                </div>


                {/* MINIMUM FILES */}

                {files.length < 2 && (

                  <p className="text-center text-sm text-orange-600 mt-3">

                    Select at least 2 PDF files to merge.

                  </p>

                )}

              </div>

            )}


            {/* =========================
                SUCCESS
            ========================= */}

            {mergedPdf && (

              <div
                className="
                  mt-8
                  bg-green-50
                  border
                  border-green-200
                  rounded-2xl
                  p-6
                  text-center
                "
              >

                <div className="text-5xl mb-3">
                  ✅
                </div>

                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  PDFs Merged Successfully!
                </h2>

                <p className="text-green-700 mb-6">
                  Your PDF files have been successfully combined
                  into one document.
                </p>


                {/* DOWNLOAD */}

                <button
                  type="button"
                  onClick={downloadPDF}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-semibold
                    py-3.5
                    px-8
                    rounded-xl
                    transition
                  "
                >
                  ⬇ Download Merged PDF
                </button>

              </div>

            )}

          </div>


          {/* =========================
              HOW IT WORKS
          ========================= */}

          <div
            className="
              mt-8
              bg-blue-50
              border
              border-blue-100
              rounded-2xl
              p-6
            "
          >

            <h3 className="font-bold text-gray-900 text-lg mb-3">
              How does Merge PDF work?
            </h3>

            <div className="space-y-2 text-sm text-gray-600">

              <p>
                <strong>1.</strong> Select two or more PDF files.
              </p>

              <p>
                <strong>2.</strong> Review your selected files.
              </p>

              <p>
                <strong>3.</strong> Click "Merge PDFs".
              </p>

              <p>
                <strong>4.</strong> Download your merged PDF.
              </p>

            </div>

          </div>


          {/* =========================
              PRIVACY INFO
          ========================= */}

          <div
            className="
              mt-4
              bg-white
              border
              border-gray-200
              rounded-xl
              p-5
              text-center
            "
          >

            <p className="text-sm text-gray-500">
              🔒 Your PDF files are processed securely by the
              server and are not stored permanently.
            </p>

          </div>

        </div>

      </div>
    </>
  );
}

export default MergePDF;