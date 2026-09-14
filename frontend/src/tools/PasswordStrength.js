import React,{useState} from "react"
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function PasswordStrength(){

const [password,setPassword]=useState("")
const [strength,setStrength]=useState("")

const checkPassword=(value)=>{

setPassword(value)

if(value.length<6){
setStrength("Weak")
}
else if(value.length<10){
setStrength("Medium")
}
else{
setStrength("Strong")
}

}

return(
    <>
    <SEO
  title="Password Strength Checker Online"
  description="Check the strength of a password online and see whether it is weak, medium, or strong."
  keywords="password strength checker, password checker, strong password, password security"
  url="https://web-tools-platform.vercel.app/password-strength"
/>

<div>
 <BackHome/>
<h2>Password Strength Checker</h2>

<input
type="password"
value={password}
onChange={(e)=>checkPassword(e.target.value)}
/>

<p>Password: {password}</p>

<p>Strength: {strength}</p>

</div>
</>
)

}

export default PasswordStrength