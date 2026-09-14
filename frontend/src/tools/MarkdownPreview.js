import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function MarkdownPreview(){

const [text,setText] = useState("")

return(
    <>
<SEO
  title="Markdown Preview Online | Free Markdown Editor"
  description="Write and preview Markdown text online with this simple free Markdown preview tool."
  keywords="markdown preview, markdown editor, markdown viewer, online markdown"
  url="https://web-tools-platform.vercel.app/markdown-preview"
/>
<div className="tool-page">

<BackHome/>

<h2>Markdown Preview</h2>

<textarea
placeholder="Write markdown"
onChange={(e)=>setText(e.target.value)}
/>

<div className="preview">
{text}
</div>

</div>
</>
)

}

export default MarkdownPreview