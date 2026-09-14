import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function ColorPicker(){

const [color,setColor]=useState("#000000")

return(
<>
<SEO
  title="Color Picker Online | Pick Colors & HEX Codes"
  description="Choose a color online and get its HEX color code instantly with our free color picker."
  keywords="color picker, online color picker, hex color picker, color code"
  url="https://web-tools-platform.vercel.app/color"
/>

<div>
 <BackHome/>
<h2>Color Picker</h2>

<input
type="color"
value={color}
onChange={(e)=>setColor(e.target.value)}
/>

<p>{color}</p>

<div style={{
width:"100px",
height:"100px",
background:color
}}></div>

</div>
</>

)

}

export default ColorPicker