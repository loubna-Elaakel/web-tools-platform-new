import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";


function QrGenerator(){

const [text,setText] = useState("");

function downloadQR(){

const canvas = document.querySelector("canvas");

const url = canvas.toDataURL("image/png");

const link = document.createElement("a");

link.href = url;
link.download = "qr-code.png";

link.click();

}

return(
<>
<SEO
  title="QR Code Generator Online | Free QR Code Maker"
  description="Generate QR codes for text and URLs online for free. Create and download QR codes instantly."
  keywords="qr code generator, qr generator, create qr code, qr code maker"
  url="https://web-tools-platform.vercel.app/qr-generator"
/>
<div style={{padding:"30px"}}>
<BackHome/>

<h2>QR Code Generator</h2>

<p>Generate QR codes for URLs or text instantly.</p>

<input
type="text"
placeholder="Enter text or URL"
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<br/><br/>

{text && <QRCodeCanvas value={text} size={200}/>}

<br/><br/>

{text && (
<button onClick={downloadQR}>
Download QR Code
</button>
)}

</div>
</>
);

}

export default QrGenerator;