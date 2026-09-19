import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function BackgroundRemover() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const upload = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError("");
    }
  };

  const removeBackground = async () => {
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/remove-background",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Background removal failed.");
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setResult(imageUrl);
    } catch (error) {
      console.error(error);

      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;

    const link = document.createElement("a");

    link.href = result;
    link.download = "background-removed.png";

    link.click();
  };

  return (
    <>
      <SEO
        title="Background Remover | Remove Image Background Online"
        description="Remove image backgrounds online for free. Upload an image and get a background-free PNG in seconds."
        keywords="background remover, remove background, image background remover, remove image background online"
        url="https://loubna-Elaakel.github.io/web-tools-platform-new/background-remover"
      />

      <div className="tool-page">

        <BackHome />

        <h1>Background Remover</h1>

        <p>
          Remove the background from an image online quickly and easily.
        </p>

        {/* Upload */}

        <input
          type="file"
          accept="image/*"
          onChange={upload}
        />

        {/* Original Image */}

        {preview && (
          <div style={{ marginTop: "20px" }}>

            <h2>Original Image</h2>

            <img
              src={preview}
              alt="Original"
              style={{
                width: "300px",
                maxWidth: "100%"
              }}
            />

          </div>
        )}

        {/* Remove Button */}

        {file && (
          <div style={{ marginTop: "20px" }}>

            <button
              onClick={removeBackground}
              disabled={loading}
            >
              {loading
                ? "Removing Background..."
                : "Remove Background"}
            </button>

          </div>
        )}

        {/* Error */}

        {error && (
          <p style={{ color: "red", marginTop: "15px" }}>
            {error}
          </p>
        )}

        {/* Result */}

        {result && (
          <div style={{ marginTop: "30px" }}>

            <h2>Result</h2>

            <img
              src={result}
              alt="Background removed"
              style={{
                width: "300px",
                maxWidth: "100%"
              }}
            />

            <br />
            <br />

            <button onClick={downloadImage}>
              Download PNG
            </button>

          </div>
        )}

        {/* FAQ */}

        <h2 style={{ marginTop: "40px" }}>
          Frequently Asked Questions
        </h2>

        <h3>
          How can I remove the background from an image?
        </h3>

        <p>
          Upload an image and click the Remove Background button.
          The tool will process the image and generate a PNG
          with the background removed.
        </p>

        <h3>
          Is the Background Remover free?
        </h3>

        <p>
          You can use this online background removal tool to
          process images directly from your browser.
        </p>

      </div>
    </>
  );
}

export default BackgroundRemover;