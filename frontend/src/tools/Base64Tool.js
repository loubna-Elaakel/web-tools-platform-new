import React, { useState } from "react";
import SEO from "../components/SEO";
import BackHome from "../components/BackHome";

function ImageToBase64() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [base64, setBase64] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setFilename(file.name);
    setBase64("");
    setDataUrl("");
    setCopied("");

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const convertToBase64 = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    setLoading(true);
    setBase64("");
    setDataUrl("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(
        "http://127.0.0.1:8000/api/image-to-base64",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Conversion failed.");
      }

      setBase64(data.base64);
      setDataUrl(data.data_url);
      setFilename(data.filename);

    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const downloadText = (text, name) => {
    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const clearAll = () => {
    setImage(null);
    setPreview("");
    setBase64("");
    setDataUrl("");
    setFilename("");
    setCopied("");

    const input = document.getElementById("image-upload");

    if (input) {
      input.value = "";
    }
  };

  return (
    <>
      <SEO
        title="Image to Base64 Converter - Convert Image Online"
        description="Convert images to Base64 online quickly and easily. Copy Base64 or Data URL and download the result."
      />

      <BackHome />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Image to Base64
            </h1>

            <p className="text-gray-600 max-w-2xl mx-auto">
              Convert your image into Base64 format and easily copy or
              download the result.
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

            {/* Upload */}
            {!preview && (
              <label
                htmlFor="image-upload"
                className="block cursor-pointer"
              >
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition">

                  <div className="text-5xl mb-4">
                    🖼️
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Upload an Image
                  </h2>

                  <p className="text-gray-500">
                    Click here to choose JPG, PNG, WEBP or other image
                  </p>

                  <p className="text-sm text-gray-400 mt-2">
                    Maximum size: 10 MB
                  </p>
                </div>
              </label>
            )}

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Preview */}
            {preview && (
              <div className="mt-2">

                <div className="flex flex-col md:flex-row gap-8">

                  {/* Image */}
                  <div className="md:w-1/2">
                    <h2 className="font-semibold text-gray-800 mb-3">
                      Preview
                    </h2>

                    <div className="border rounded-xl p-4 bg-gray-50 flex justify-center">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-80 max-w-full object-contain rounded-lg"
                      />
                    </div>

                    <p className="text-sm text-gray-500 mt-3 break-all">
                      {filename}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="md:w-1/2 flex flex-col justify-center">

                    <button
                      onClick={convertToBase64}
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition"
                    >
                      {loading
                        ? "Converting..."
                        : "Convert to Base64"}
                    </button>

                    <button
                      onClick={clearAll}
                      className="w-full mt-3 border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl transition"
                    >
                      Clear
                    </button>

                  </div>
                </div>
              </div>
            )}

            {/* Result */}
            {base64 && (
              <div className="mt-10 border-t pt-8">

                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-gray-900">
                    Base64 Result
                  </h2>

                  <span className="text-sm text-gray-500">
                    {base64.length.toLocaleString()} characters
                  </span>
                </div>

                <textarea
                  value={base64}
                  readOnly
                  rows={8}
                  className="w-full border border-gray-300 rounded-xl p-4 text-sm font-mono bg-gray-50 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">

                  <button
                    onClick={() =>
                      copyText(base64, "base64")
                    }
                    className="bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-semibold transition"
                  >
                    {copied === "base64"
                      ? "✓ Base64 Copied"
                      : "Copy Base64"}
                  </button>

                  <button
                    onClick={() =>
                      copyText(dataUrl, "dataurl")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    {copied === "dataurl"
                      ? "✓ Data URL Copied"
                      : "Copy Data URL"}
                  </button>

                </div>

                <button
                  onClick={() =>
                    downloadText(
                      base64,
                      `${filename}-base64.txt`
                    )
                  }
                  className="w-full mt-3 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition"
                >
                  Download Base64 (.txt)
                </button>

              </div>
            )}

          </div>

          {/* Info */}
          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">
              What is Base64?
            </h3>

            <p className="text-sm text-gray-600 leading-6">
              Base64 converts binary image data into text. This allows
              images to be embedded directly inside HTML, CSS, JSON or
              other text-based formats.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}

export default ImageToBase64;