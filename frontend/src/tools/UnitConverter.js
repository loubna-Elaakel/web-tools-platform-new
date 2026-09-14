import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function UnitConverter(){

const [km,setKm]=useState("")
const [result,setResult]=useState("")

function convert(){

setResult(km*1000 + " meters")

}

return(
<>
<SEO
  title="Unit Converter Online | Convert Units for Free"
  description="Convert common units online quickly and easily with this free unit converter."
  keywords="unit converter, online unit converter, convert units, measurement converter"
  url="https://web-tools-platform.vercel.app/unit-converter"
/>
<div>
 <BackHome/>
<h2>KM to Meter</h2>

<input
value={km}
onChange={(e)=>setKm(e.target.value)}
/>

<button onClick={convert}>
Convert
</button>

<p>{result}</p>

</div>
</>
)

}

export default UnitConverter