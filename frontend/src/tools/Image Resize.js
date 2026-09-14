import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function ImageResize(){

const [img,setImg]=useState(null)

function handle(e){
setImg(URL.createObjectURL(e.target.files[0]))
}

return(
<>
<SEO
  title="Image Resizer Online | Resize Images for Free"
  description="Resize images online for free. Upload an image and preview the resized version quickly and easily."
  keywords="image resizer, resize image online, image resize tool, free image resizer"
  url="https://web-tools-platform.vercel.app/image-resize"
/>
<div>
<BackHome/>

<h2>Image Resize</h2>

<input type="file" onChange={handle} />

{img && <img src={img} width="200" />}

</div>
</>
)

}

export default ImageResize