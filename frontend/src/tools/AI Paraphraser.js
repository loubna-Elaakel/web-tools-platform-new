import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function AIParaphraser() {

  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {

    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/paraphrase",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },

          body: JSON.stringify({
            text: text,
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

    await navigator.clipboard.writeText(result);

    alert("Paraphrased text copied!");

  };

  return (
    <>
      <SEO
        title="AI Paraphraser | Rewrite Text Online"
        description="Rewrite and paraphrase text online with our free AI paraphrasing tool. Improve your writing while keeping the original meaning."
        keywords="AI paraphraser, paraphrasing tool, rewrite text, AI text rewriter, online paraphraser"
        url="https://web-tools-platform.vercel.app/ai-paraphraser"
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

        <h1>AI Paraphraser</h1>

        <p>
          Rewrite and paraphrase your text online while
          keeping the original meaning.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter the text you want to paraphrase..."
          rows="10"
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical"
          }}
        />

        <button
          onClick={generate}
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "12px 25px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Paraphrasing..." : "Paraphrase"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "15px"
            }}
          >
            {error}
          </p>
        )}

        {result && (
          <div style={{ marginTop: "30px" }}>

            <h2>Paraphrased Text</h2>

            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                whiteSpace: "pre-wrap",
                background: "#f8f8f8"
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
              Copy Result
            </button>

          </div>
        )}

        <div style={{ marginTop: "50px" }}>

          <h2>What is an AI Paraphraser?</h2>

          <p>
            An AI paraphraser rewrites text using different
            words and sentence structures while preserving
            the original meaning.
          </p>

          <h2>How to use this tool?</h2>

          <p>
            Enter your text in the box above and click
            the Paraphrase button. The rewritten text
            will appear below.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Is this paraphrasing tool free?</h3>

          <p>
            You can use this online paraphrasing tool
            to rewrite your text quickly and easily.
          </p>

          <h3>Does paraphrasing change the original meaning?</h3>

          <p>
            The tool is designed to rewrite the text
            while keeping its original meaning.
          </p>

        </div>

      </div>
    </>
  );
}

export default AIParaphraser;