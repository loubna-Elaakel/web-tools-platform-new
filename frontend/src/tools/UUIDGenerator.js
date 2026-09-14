import { useState } from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function UUIDGenerator(){

const [uuid,setUuid] = useState("")

function generate(){

const id = crypto.randomUUID()

setUuid(id)

}

return(
<>
<SEO
  title="UUID Generator Online | Generate Random UUIDs"
  description="Generate UUIDs online for free. Create random unique identifiers instantly."
  keywords="uuid generator, random uuid, generate uuid, uuid online"
  url="https://web-tools-platform.vercel.app/uuid-generator"
/>
<div style={{padding:"40px"}}>

<BackHome/>

<h2>UUID Generator</h2>

 <p>Generate unique identifiers (UUID) online.</p>
 
<button onClick={generate}>
Generate UUID
</button>

<p>{uuid}</p>

</div>
</>
)

}

export default UUIDGenerator