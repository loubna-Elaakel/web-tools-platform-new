import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function PDFSplit(){

const [file,setFile]=useState(null)

return(
<>
<SEO
  title="Split PDF Online | Free PDF Splitter"
  description="Split PDF files online with our free PDF splitter tool."
  keywords="split pdf, pdf splitter, split pdf online, divide pdf"
  url="https://web-tools-platform.vercel.app/pdf-split"
/>
<div>
    
<BackHome/>

<h2>PDF Split</h2>

<input type="file" onChange={(e)=>setFile(e.target.files[0])} />

<p>{file ? file.name : "No file"}</p>

</div>
</>
)

}

export default PDFSplit