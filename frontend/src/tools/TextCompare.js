import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function TextCompare(){

const [text1,setText1]=useState("")
const [text2,setText2]=useState("")

const isSame = text1 === text2

return(
<>
<SEO
  title="Text Compare | Compare Two Texts Online"
  description="Compare two pieces of text online and identify differences quickly and easily."
  keywords="text compare, compare text, text difference checker, compare two texts"
  url="https://web-tools-platform.vercel.app/text-compare"
/>
<div>
 <BackHome/>
<h2>Text Compare Tool</h2>

<textarea
placeholder="Text 1"
value={text1}
onChange={(e)=>setText1(e.target.value)}
/>

<textarea
placeholder="Text 2"
value={text2}
onChange={(e)=>setText2(e.target.value)}
/>

<h3>
{isSame ? "✅ Same Text" : "❌ Different Text"}
</h3>

</div>
</>
)

}

export default TextCompare