import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function RegexTester(){

const [pattern,setPattern] = useState("")
const [text,setText] = useState("")
const [result,setResult] = useState("")

function testRegex(){

try{

const regex = new RegExp(pattern,"g")
const matches = text.match(regex)

setResult(matches ? matches.join(", ") : "No match")

}catch{

setResult("Invalid regex")

}

}

return(
<>
<SEO
  title="Regex Tester Online | Test Regular Expressions"
  description="Test regular expressions online with this free regex tester for developers."
  keywords="regex tester, regular expression tester, regex online, regex tool"
  url="https://web-tools-platform.vercel.app/regex-tester"
/>
<div className="tool-page">

<BackHome/>

<h2>Regex Tester</h2>

<input
placeholder="Regex pattern"
onChange={(e)=>setPattern(e.target.value)}
/>

<textarea
placeholder="Text to test"
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={testRegex}>Test</button>

<p>{result}</p>

</div>
</>
)

}

export default RegexTester