import React, { useState } from "react";
import BackHome from "../components/BackHome";
import SEO from "../components/SEO";

function AIResumeGenerator() {
  const [form, setForm] = useState({
    name: "",
    job_title: "",
    skills: "",
    experience: "",
    education: "",
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const generateResume = async () => {
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!form.job_title.trim()) {
      setError("Please enter your job title.");
      return;
    }

    if (!form.skills.trim()) {
      setError("Please enter your skills.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/ai-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            job_title: form.job_title,
            skills: form.skills,
            experience: form.experience,
            education: form.education,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to generate resume."
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

  const copyResume = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      setError("Unable to copy the resume.");
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      job_title: "",
      skills: "",
      experience: "",
      education: "",
    });

    setResult("");
    setError("");
    setCopied(false);
  };

  return (
    <>
      <SEO
        title="AI Resume Generator | Create a Professional Resume"
        description="Create professional resume content instantly with our AI Resume Generator. Enter your skills, experience and education to generate a professional CV."
        keywords="AI resume generator, resume generator, CV generator, AI CV maker, professional resume"
        url="https://web-tools-platform.vercel.app/ai-resume-generator"
      />

      <div
        className="tool-page"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <BackHome />

        <h1>AI Resume Generator</h1>

        <p>
          Create professional resume content instantly
          using AI.
        </p>

        {/* Name */}

        <div style={{ marginTop: "25px" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Example: John Doe"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Job Title */}

        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="job_title"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Job Title
          </label>

          <input
            id="job_title"
            name="job_title"
            type="text"
            value={form.job_title}
            onChange={handleChange}
            placeholder="Example: Full Stack Developer"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Skills */}

        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="skills"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Skills
          </label>

          <textarea
            id="skills"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Example: React, Laravel, JavaScript, MySQL, HTML, CSS"
            rows="5"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Experience */}

        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="experience"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Work Experience
          </label>

          <textarea
            id="experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            placeholder="Example: Worked as a Full Stack Developer and developed web applications using React and Laravel."
            rows="6"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Education */}

        <div style={{ marginTop: "20px" }}>
          <label
            htmlFor="education"
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "bold",
            }}
          >
            Education
          </label>

          <textarea
            id="education"
            name="education"
            value={form.education}
            onChange={handleChange}
            placeholder="Example: Technicien Spécialisé en Développement Digital - Web Full Stack"
            rows="5"
            style={{
              width: "100%",
              padding: "14px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "25px",
          }}
        >
          <button
            type="button"
            onClick={generateResume}
            disabled={loading}
            style={{
              padding: "13px 25px",
              borderRadius: "8px",
              border: "none",
              cursor: loading
                ? "not-allowed"
                : "pointer",
              fontSize: "16px",
            }}
          >
            {loading
              ? "Generating..."
              : "Generate Resume"}
          </button>

          <button
            type="button"
            onClick={clearForm}
            style={{
              padding: "13px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Clear
          </button>
        </div>

        {/* Error */}

        {error && (
          <div
            style={{
              marginTop: "20px",
              padding: "12px",
              borderRadius: "8px",
              background: "#ffe5e5",
              color: "#c00",
            }}
          >
            {error}
          </div>
        )}

        {/* Result */}

        {result && (
          <div style={{ marginTop: "40px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <h2>Generated Resume</h2>

              <button
                type="button"
                onClick={copyResume}
                style={{
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {copied
                  ? "Copied!"
                  : "Copy Resume"}
              </button>
            </div>

            <div
              style={{
                marginTop: "15px",
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                background: "#fafafa",
                whiteSpace: "pre-wrap",
                lineHeight: "1.7",
                fontSize: "16px",
              }}
            >
              {result}
            </div>
          </div>
        )}

        {/* Information */}

        <section style={{ marginTop: "60px" }}>
          <h2>What is an AI Resume Generator?</h2>

          <p>
            An AI Resume Generator helps you create
            professional resume content using your
            personal information, skills, experience,
            and education.
          </p>

          <h2>How does it work?</h2>

          <p>
            Enter your information and click Generate
            Resume. The AI organizes your information
            into professional resume sections.
          </p>

          <h2>Who can use this tool?</h2>

          <p>
            This tool is useful for job seekers,
            students, graduates, freelancers, and
            professionals who want to improve their
            resume content.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Is the generated resume based on my information?</h3>

          <p>
            Yes. The AI is instructed to use the
            information you provide and avoid inventing
            qualifications or experience.
          </p>

          <h3>Can I copy my generated resume?</h3>

          <p>
            Yes. Click the Copy Resume button to copy
            the generated content.
          </p>
        </section>
      </div>
    </>
  );
}

export default AIResumeGenerator;