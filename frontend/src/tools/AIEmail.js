import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function AIEmail() {

  const [topic, setTopic] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {

    if (!topic.trim()) {
      setError("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-email",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },

          body: JSON.stringify({
            topic: topic,
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

    alert("Email copied!");

  };


  return (
    <>
      <SEO
        title="AI Email Generator | Write Professional Emails"
        description="Generate professional emails instantly with our free AI Email Generator. Enter your topic and create a clear, professional email."
        keywords="AI email generator, email generator, write email, professional email generator, AI email writer"
        url="https://web-tools-platform.vercel.app/ai-email"
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

        <h1>AI Email Generator</h1>

        <p>
          Generate professional emails instantly using AI.
          Enter your topic and let the AI write the email for you.
        </p>


        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Example: I want to ask my manager for a day off..."
          rows="8"
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
          {loading ? "Generating..." : "Generate Email"}
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

            <h2>Generated Email</h2>

            <div
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#f8f8f8",
                whiteSpace: "pre-wrap",
                lineHeight: "1.6"
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
              Copy Email
            </button>

          </div>
        )}


        <div style={{ marginTop: "50px" }}>

          <h2>What is an AI Email Generator?</h2>

          <p>
            An AI Email Generator helps you create professional
            emails from a simple topic or description.
            You do not need to write the entire email yourself.
          </p>


          <h2>How to use this tool?</h2>

          <p>
            Enter the purpose or topic of your email in the
            text box above, then click Generate Email.
            The AI will create a complete email for you.
          </p>


          <h2>Who can use this tool?</h2>

          <p>
            Students, employees, job seekers, businesses,
            freelancers and anyone who needs to write
            professional emails can use this tool.
          </p>


          <h2>Frequently Asked Questions</h2>

          <h3>Can I generate a professional email?</h3>

          <p>
            Yes. The tool is designed to generate clear
            and professional emails based on your topic.
          </p>


          <h3>Do I need to write the whole email?</h3>

          <p>
            No. Simply describe what you want to say and
            the AI will generate the email.
          </p>

        </div>

      </div>
    </>
  );
}

export default AIEmail;