import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

export default function ImageToBase64() {

  const convert = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result;

      const blob = new Blob([base64], { type: "text/plain" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "image-base64.txt";
      link.click();
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
    <SEO
  title="Image to Base64 Converter Online"
  description="Convert images to Base64 online for free. Upload an image, preview it, and copy the Base64 encoded data."
  keywords="image to base64, image base64 converter, convert image to base64, base64 image"
  url="https://web-tools-platform.vercel.app/image-to-base64"
/>
    <div>
        <BackHome/>

      <h2>Image to Base64</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => convert(e.target.files[0])}
      />
    </div>
    </>
  );
}