import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function RandomNameGenerator(){

const names = ["Lina","Adam","Sara","Youssef","Nora","Samir","Omar","Amina"]

const [name,setName] = useState("")

function generate(){

const random = names[Math.floor(Math.random()*names.length)]

setName(random)

}

return(
    <>
<SEO
  title="Random Name Generator | Generate Names Online"
  description="Generate random names online for free. Useful for ideas, projects, characters and more."
  keywords="random name generator, generate random names, name generator"
  url="https://web-tools-platform.vercel.app/random-name-generator"
/>
<div style={{padding:"40px"}}>

<BackHome/>

<h2>Random Name Generator</h2>

<p>Generate random names online.</p>

<button onClick={generate}>
Generate Name
</button>

<h3>{name}</h3>

</div>
</>
)

}

export default RandomNameGenerator