import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function TimestampConverter(){

const [timestamp,setTimestamp]=useState("")
const [date,setDate]=useState("")

function convert(){

const d = new Date(Number(timestamp)*1000)

setDate(d.toString())

}

return(
<>
<SEO
  title="Timestamp Converter | Convert Unix Timestamps"
  description="Convert Unix timestamps online quickly and easily with this free timestamp converter."
  keywords="timestamp converter, unix timestamp converter, epoch converter, unix time"
  url="https://web-tools-platform.vercel.app/timestamp-converter"
/>
<div>
 <BackHome/>
<h2>Timestamp Converter</h2>

<input
placeholder="Enter timestamp"
value={timestamp}
onChange={(e)=>setTimestamp(e.target.value)}
/>

<button onClick={convert}>
Convert
</button>

<p>{date}</p>

</div>
</>
)

}

export default TimestampConverter