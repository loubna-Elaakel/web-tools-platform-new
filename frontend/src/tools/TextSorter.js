import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function TextSorter(){

const [text,setText] = useState("")
const [result,setResult] = useState("")

function sortText(){

const sorted = text.split("\n").sort().join("\n")

setResult(sorted)

}

return(
<>
<SEO
  title="Text Sorter | Sort Lines Alphabetically Online"
  description="Sort text and lines alphabetically online for free. Quickly organize your text."
  keywords="text sorter, sort text, alphabetize text, sort lines"
  url="https://web-tools-platform.vercel.app/text-sorter"
/>
<div style={{padding:"40px"}}>

<BackHome/>

<h2>Text Sorter</h2>

<p>Sort lines of text alphabetically.</p>

<textarea
placeholder="Enter lines of text"
onChange={(e)=>setText(e.target.value)}
style={{width:"100%",height:"120px"}}
/>

<button onClick={sortText}>
Sort Text
</button>

<textarea
value={result}
readOnly
style={{width:"100%",height:"120px"}}
/>

</div>
</>
)

}

export default TextSorter