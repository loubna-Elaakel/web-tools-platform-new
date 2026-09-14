import { useState } from "react";
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function JsonFormatter(){

const [input,setInput] = useState("");
const [output,setOutput] = useState("");
const [error,setError] = useState("");

function formatJSON(){

try{

const parsed = JSON.parse(input);

const formatted = JSON.stringify(parsed,null,2);

setOutput(formatted);

setError("");

}catch{

setOutput("");

setError("Invalid JSON");

}

}

return(
    <>
    <SEO
  title="JSON Formatter & Validator Online"
  description="Format and validate JSON data online for free. Make JSON code easier to read and detect invalid JSON instantly."
  keywords="json formatter, json validator, format json, json beautifier"
  url="https://web-tools-platform.vercel.app/json-formatter"
/>

<div style={{padding:"30px"}}>
<BackHome/>
<h2>JSON Formatter</h2>
<p>Format and validate JSON code instantly.</p>


<textarea
rows="8"
placeholder="Paste JSON here..."
value={input}
onChange={(e)=>setInput(e.target.value)}
/>

<br/><br/>

<button onClick={formatJSON}>
Format JSON
</button>

<br/><br/>

{error && (
<p style={{color:"red"}}>
{error}
</p>
)}

<pre>{output}</pre>

</div>
</>
);

}

export default JsonFormatter;