import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function AIProduct() {

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {

    if (!name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-product",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },

          body: JSON.stringify({
            name: name,
            details: details,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }

      setResult(data.result);

    } catch (err) {

      setError(
        err.message ||
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }
  };


  const copyResult = async () => {

    if (!result) return;

    try {

      await navigator.clipboard.writeText(result);

      alert("Product description copied!");

    } catch {

      setError("Unable to copy the description.");

    }
  };


  const clearAll = () => {

    setName("");
    setDetails("");
    setResult("");
    setError("");

  };


  return (
    <>
      <SEO
        title="AI Product Description Generator | Write Product Descriptions"
        description="Generate professional and attractive product descriptions with our AI Product Description Generator. Enter your product details and create descriptions instantly."
        keywords="AI product description generator, product description generator, AI product writer, product description tool, ecommerce product description"
        url="https://web-tools-platform.vercel.app/ai-product"
      />

      <div
        className="tool-page"
        style={{
          padding: "40px",
          maxWidth: "900px",
          margin: "auto"
        }}
      >

        <BackHome />

        <h1>AI Product Description Generator</h1>

        <p>
          Create professional and attractive product
          descriptions instantly using AI.
        </p>


        {/* Product Name */}

        <div style={{ marginTop: "25px" }}>

          <label
            htmlFor="product-name"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            Product Name
          </label>

          <input
            id="product-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Example: Wireless Bluetooth Headphones"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxSizing: "border-box"
            }}
          />

        </div>


        {/* Product Details */}

        <div style={{ marginTop: "20px" }}>

          <label
            htmlFor="product-details"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold"
            }}
          >
            Product Details
          </label>

          <textarea
            id="product-details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Example: Wireless headphones with comfortable ear cushions, built-in microphone and rechargeable battery."
            rows="7"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              resize: "vertical",
              boxSizing: "border-box"
            }}
          />

        </div>


        {/* Buttons */}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={generate}
            disabled={loading}
            style={{
              padding: "12px 24px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading
              ? "Generating..."
              : "Generate Description"}
          </button>


          <button
            onClick={clearAll}
            type="button"
            style={{
              padding: "12px 24px"
            }}
          >
            Clear
          </button>

        </div>


        {/* Error */}

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "20px"
            }}
          >
            {error}
          </p>
        )}


        {/* Result */}

        {result && (

          <div style={{ marginTop: "35px" }}>

            <h2>Generated Product Description</h2>

            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#f8f8f8",
                whiteSpace: "pre-wrap",
                lineHeight: "1.7"
              }}
            >
              {result}
            </div>


            <button
              onClick={copyResult}
              style={{
                marginTop: "15px",
                padding: "10px 20px"
              }}
            >
              Copy Description
            </button>

          </div>

        )}


        {/* SEO / Information Content */}

        <div style={{ marginTop: "55px" }}>

          <h2>What is an AI Product Description Generator?</h2>

          <p>
            An AI Product Description Generator helps
            you create clear, attractive and professional
            descriptions for products. It can save time
            when preparing content for an online store,
            marketplace or ecommerce website.
          </p>


          <h2>How to use the AI Product Description Generator?</h2>

          <p>
            Enter the name of your product and optionally
            provide its features or details. Then click
            Generate Description to create a professional
            product description.
          </p>


          <h2>Who can use this tool?</h2>

          <p>
            This tool can be useful for online store owners,
            ecommerce businesses, freelancers, marketers,
            sellers and content creators.
          </p>


          <h2>Frequently Asked Questions</h2>


          <h3>Can I generate a product description for an online store?</h3>

          <p>
            Yes. The generated description is designed
            to be suitable for ecommerce and online
            product listings.
          </p>


          <h3>Do I need to provide product details?</h3>

          <p>
            Providing product features and details can
            help generate a more specific and useful
            description.
          </p>


          <h3>Can I copy the generated description?</h3>

          <p>
            Yes. Use the Copy Description button to
            copy the generated text.
          </p>

        </div>

      </div>
    </>
  );
}

export default AIProduct;