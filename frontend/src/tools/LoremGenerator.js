import { useState } from "react";
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";


function LoremGenerator(){

const text = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const [result,setResult] = useState("");

function generate(){

let paragraph = "";

for(let i=0;i<5;i++){
paragraph += text + " ";
}

setResult(paragraph);

}

return(
<>
<SEO
  title="Lorem Ipsum Generator | Free Placeholder Text"
  description="Generate Lorem Ipsum placeholder text online for free for websites, designs, and development projects."
  keywords="lorem ipsum generator, placeholder text generator, lorem ipsum"
  url="https://web-tools-platform.vercel.app/lorem-generator"
/>
<div style={{padding:"30px"}}>
<BackHome/>

<h2>Lorem Ipsum Generator</h2>

<p>Generate placeholder text for design.</p>

<button onClick={generate}>
Generate Text
</button>

<p>{result}</p>

</div>
</>
);

}

export default LoremGenerator;