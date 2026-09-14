import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function SlugGenerator(){

const [text,setText]=useState("")
const [slug,setSlug]=useState("")

function generate(){

const s = text
.toLowerCase()
.replace(/[^a-z0-9 ]/g,"")
.replace(/\s+/g,"-")

setSlug(s)

}

return(
<>
<SEO
  title="Slug Generator | Create SEO-Friendly URLs"
  description="Create clean and SEO-friendly URL slugs from text online for free."
  keywords="slug generator, url slug generator, seo slug, create url slug"
  url="https://web-tools-platform.vercel.app/slug-generator"
/>
<div>
 <BackHome/>
<h2>Slug Generator</h2>

<input
placeholder="Enter text..."
value={text}
onChange={(e)=>setText(e.target.value)}
/>

<button onClick={generate}>
Generate
</button>

<p>{slug}</p>

</div>
</>
)

}

export default SlugGenerator