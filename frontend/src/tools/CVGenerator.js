import React, { useState } from "react";
import html2pdf from "html2pdf.js";
import "./cv.css";
import SEO from "../components/SEO";

export default function CVGenerator() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    profile: "",
    experience: "",
    education: "",
    competences: "",
    capacites: "",
    languages: "",
    interets: "",
  });

  const [image, setImage] = useState(null);
  const [imageStyle, setImageStyle] = useState("circle");
  const [template, setTemplate] = useState("dark");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const downloadPDF = () => {

  const element = document.getElementById("cv-preview");

  // ⭐ Force desktop layout
  element.style.width = "794px";
  element.style.height = "1123px";
  element.style.flexDirection = "row";

  html2pdf().set({
  margin: 0,
  filename: "CV.pdf",
  image: {
    type: "jpeg",
    quality: 1
  },
  html2canvas: {
    scale: 4,
    useCORS: true,
    allowTaint: true,
    scrollY: 0
  },
  jsPDF: {
    unit: "px",
    format: [794, 1123],
    orientation: "portrait"
  }
}).from(element).save();
};

  return (
    <>
    <SEO
  title="Free CV Generator | Create & Download Your CV"
  description="Create a professional CV online for free. Add your information, photo, skills and experience, then download your CV as a PDF."
  keywords="cv generator, resume generator, free cv maker, create cv online, resume maker"
  url="https://web-tools-platform.vercel.app/cv-generator"
/>
    <div className="container">
      
      {/* FORM */}
      <div className="form">
        <h2>Create Your CV</h2>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />

        <textarea name="profile" placeholder="Profile" onChange={handleChange} />
        <textarea name="experience" placeholder="Experience " onChange={handleChange} />
        <textarea name="education" placeholder="Education" onChange={handleChange} />
        <textarea name="competences" placeholder="Compétences " onChange={handleChange} />
        <textarea name="capacites" placeholder="Capacités " onChange={handleChange} />
        <textarea name="languages" placeholder="Languages" onChange={handleChange} />
        <textarea name="interets" placeholder="Intérêts " onChange={handleChange} />

        {/* Image */}
        <input
          type="file"
          id="upload"
          style={{ display: "none" }}
          onChange={(e) =>
            setImage(URL.createObjectURL(e.target.files[0]))
          }
        />
        <label htmlFor="upload" className="upload-btn">
          Ajouter une photo
        </label>

        {/* Image Style */}
        <select onChange={(e) => setImageStyle(e.target.value)}>
          <option value="circle">Image Cercle</option>
          <option value="square">Image Carré</option>
        </select>

        {/* Template */}
        <select onChange={(e) => setTemplate(e.target.value)}>
          <option value="dark">Dark CV</option>
          <option value="light">Light CV</option>
          <option value="white">White CV</option>

        </select>

        <button onClick={downloadPDF}>Download CV</button>
      </div>

      {/* CV */}
<div id="cv-preview" className={`cv ${template} pdf-mode`}>        {/* LEFT */}
        <div className="left">
          {image && (
            <img
              src={image}
              alt="profile"
              className={
                imageStyle === "circle" ? "img-circle" : "img-square"
              }
            />
          )}

          <h3>Contact</h3>
          <p><span className="icon">📞</span>{data.phone}</p>
          <p><span className="icon">📧</span>{data.email}</p>
          <p><span className="icon">📍</span>{data.address}</p>

          <h3>Compétences</h3>
          <p>{data.competences}</p>

          <h3>Capacités</h3>
          <p>{data.capacites}</p>

          <h3>Languages</h3>
          <p>{data.languages}</p>

          <h3>Intérêts</h3>
          <p>{data.interets}</p>
        </div>

        {/* RIGHT */}
        <div className="right">
        <div className="header">
         <h1>{data.name}</h1>
         </div>
         <div className="content">

          <h2>Profile</h2>
          <p>{data.profile}</p>

          <h2>Experience</h2>
          <p>{data.experience}</p>

          <h2>Education</h2>
          <p>{data.education}</p>
        </div>
        </div>
      </div>
    </div>
    </>
  );
}