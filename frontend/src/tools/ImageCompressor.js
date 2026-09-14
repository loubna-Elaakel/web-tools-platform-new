import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

export default function CompressImage() {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);

  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const compressImage = async (file) => {
    if (!file) return;

    setLoading(true);
    setError("");
    setCompressedImage(null);
    setCompressedSize(0);

    // Original image
    const originalUrl = URL.createObjectURL(file);

    setOriginalImage(originalUrl);
    setOriginalSize(file.size);

    try {
      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        "http://127.0.0.1:8000/api/compress-image",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("STATUS:", response.status);
      console.log("CONTENT TYPE:", response.headers.get("content-type"));

      if (!response.ok) {
        const text = await response.text();

        console.log("SERVER ERROR:", text);

        throw new Error(
          "Laravel returned an error: " + response.status
        );
      }

      const blob = await response.blob();

      console.log("BLOB:", blob);
      console.log("BLOB SIZE:", blob.size);
      console.log("BLOB TYPE:", blob.type);

      if (blob.size === 0) {
        throw new Error(
          "Laravel returned an empty image."
        );
      }

      // Create compressed preview
      const compressedUrl = URL.createObjectURL(blob);

      setCompressedImage({
        url: compressedUrl,
        blob: blob,
      });

      setCompressedSize(blob.size);

    } catch (err) {
      console.error("COMPRESSION ERROR:", err);

      setError(
        err.message || "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    if (!compressedImage) {
      setError(
        "The compressed image is not ready yet."
      );
      return;
    }

    const url = URL.createObjectURL(
      compressedImage.blob
    );

    const link = document.createElement("a");

    link.href = url;
    link.download = "compressed.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <>
      <SEO
        title="Image Compressor Online | Compress Images for Free"
        description="Compress images online for free and reduce image file size quickly while keeping good quality."
        keywords="image compressor, compress image online, reduce image size, image compression"
        url="https://web-tools-platform.vercel.app/image-compressor"
      />

      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "30px 20px",
        }}
      >
        <BackHome />

        <h1>Compress Image</h1>

        <p>
          Upload an image and compress it instantly.
        </p>

        {/* Upload */}
        <input
          type="file"
          accept="image/*"
          disabled={loading}
          onChange={(e) => {
            compressImage(e.target.files[0]);
          }}
        />

        {/* Loading */}
        {loading && (
          <p style={{ marginTop: "20px" }}>
            Compressing image...
          </p>
        )}

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
            }}
          >
            {error}
          </div>
        )}

        {/* Images */}
        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {/* ORIGINAL */}
          {originalImage && (
            <div
              style={{
                flex: "1 1 300px",
              }}
            >
              <h2>Original Image</h2>

              <img
                src={originalImage}
                alt="Original"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  display: "block",
                }}
              />

              <p>
                <strong>Size:</strong>{" "}
                {formatSize(originalSize)}
              </p>
            </div>
          )}

          {/* COMPRESSED */}
          {compressedImage && (
            <div
              style={{
                flex: "1 1 300px",
              }}
            >
              <h2>Compressed Image</h2>

              <img
                src={compressedImage.url}
                alt="Compressed"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  maxHeight: "400px",
                  objectFit: "contain",
                  borderRadius: "10px",
                  display: "block",
                }}
              />

              <p>
                <strong>Size:</strong>{" "}
                {formatSize(compressedSize)}
              </p>
            </div>
          )}
        </div>

        {/* DOWNLOAD BUTTON */}
        <div style={{ marginTop: "30px" }}>
          <button
            type="button"
            onClick={downloadImage}
            disabled={!compressedImage || loading}
            style={{
              padding: "14px 25px",
              background:
                compressedImage && !loading
                  ? "#2563eb"
                  : "#9ca3af",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor:
                compressedImage && !loading
                  ? "pointer"
                  : "not-allowed",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {loading
              ? "Compressing..."
              : "Download Compressed Image"}
          </button>
        </div>

        {/* FAQ */}
        <div
          style={{
            marginTop: "50px",
          }}
        >
          <h2>
            Frequently Asked Questions
          </h2>

          <h3>
            How does this tool work?
          </h3>

          <p>
            Upload an image and the server compresses
            it automatically.
          </p>

          <h3>
            Is quality preserved?
          </h3>

          <p>
            The image is resized and compressed while
            maintaining good visual quality.
          </p>
        </div>
      </div>
    </>
  );
}