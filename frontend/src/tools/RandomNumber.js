import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function RandomNumber(){

const [min,setMin] = useState(1)
const [max,setMax] = useState(100)
const [number,setNumber] = useState(null)

function generate(){

const n = Math.floor(Math.random()*(max-min+1))+Number(min)

setNumber(n)

}

return(
<>
<SEO
  title="Random Number Generator | Free Online Tool"
  description="Generate random numbers online for free. Choose a number range and get a random result instantly."
  keywords="random number generator, random number, generate random number"
  url="https://web-tools-platform.vercel.app/random-number"
/>

<div style={{padding:"40px"}}>

<BackHome/>

<h2>Random Number Generator</h2>

<p>Generate random numbers between ranges.</p>

<input
type="number"
value={min}
onChange={(e)=>setMin(e.target.value)}
placeholder="Min"
/>

<input
type="number"
value={max}
onChange={(e)=>setMax(e.target.value)}
placeholder="Max"
/>

<button onClick={generate}>
Generate
</button>

<h3>{number}</h3>

</div>
</>
)

}

export default RandomNumber