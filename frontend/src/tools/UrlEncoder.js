import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function UrlEncoder(){

const [text,setText] = useState("")
const [result,setResult] = useState("")

function encodeURL(){
setResult(encodeURIComponent(text))
}

function decodeURL(){
setResult(decodeURIComponent(text))
}

return(
<>
<SEO
  title="URL Encoder & Decoder Online"
  description="Encode and decode URLs online for free with this simple URL encoder and decoder."
  keywords="url encoder, url decoder, encode url, decode url"
  url="https://web-tools-platform.vercel.app/url-encoder"
/>
<div className="tool-page">

<BackHome/>

<h2>URL Encoder / Decoder</h2>

<textarea
placeholder="Enter URL here"
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={encodeURL}>Encode</button>
<button onClick={decodeURL}>Decode</button>

<textarea value={result} readOnly/>

</div>
</>
)

}

export default UrlEncoder