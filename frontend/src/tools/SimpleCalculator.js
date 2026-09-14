import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function SimpleCalculator(){

const [num1,setNum1] = useState("")
const [num2,setNum2] = useState("")
const [result,setResult] = useState("")

function add(){
setResult(Number(num1)+Number(num2))
}

return(
<>
<SEO
  title="Online Calculator | Free Simple Calculator"
  description="Use this free online calculator for quick and simple mathematical calculations."
  keywords="online calculator, simple calculator, free calculator, calculator online"
  url="https://web-tools-platform.vercel.app/simple-calculator"
/>
<div className="tool-page">

<BackHome/>

<h2>Simple Calculator</h2>

<input
type="number"
placeholder="Number 1"
onChange={(e)=>setNum1(e.target.value)}
/>

<input
type="number"
placeholder="Number 2"
onChange={(e)=>setNum2(e.target.value)}
/>

<button onClick={add}>Add</button>

<p>{result}</p>

</div>
</>
)

}

export default SimpleCalculator