import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function TextRepeater(){

const [text,setText] = useState("")
const [count,setCount] = useState(1)
const [result,setResult] = useState("")

function repeatText(){

let output=""

for(let i=0;i<count;i++){
output+=text+" "
}

setResult(output)

}

return(
<>
<SEO
  title="Text Repeater | Repeat Text Online"
  description="Repeat text multiple times instantly with this free online text repeater."
  keywords="text repeater, repeat text, repeat text online, text generator"
  url="https://web-tools-platform.vercel.app/text-repeater"
/>
<div style={{padding:"40px"}}>

<BackHome/>

<h2>Text Repeater</h2>

<p>Repeat any text multiple times online.</p>

<input
type="text"
placeholder="Enter text"
onChange={(e)=>setText(e.target.value)}
/>

<input
type="number"
placeholder="Repeat count"
onChange={(e)=>setCount(e.target.value)}
/>

<button onClick={repeatText}>
Generate
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

export default TextRepeater