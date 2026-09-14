import React, { useState } from "react";
import BackHome from "../components/BackHome"
import SEO from "../components/SEO";

function PasswordGenerator(){

const [password,setPassword] = useState("");

function generatePassword(){

const chars =
"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";

let newPassword = "";

for(let i=0;i<12;i++){

newPassword += chars[Math.floor(Math.random()*chars.length)];

}

setPassword(newPassword);

}

return(

<>
  <SEO
    title="Password Generator | Web Tools Platform"
    description="Generate strong and secure passwords online for free."
    keywords="password generator, secure password, random password"
    url="https://web-tools-platform.vercel.app/password-generator"
  />
<div style={{padding:"40px"}}>
<BackHome/>

<h2>Password Generator</h2>

<p>Create strong and secure passwords online for free.</p>

<button onClick={generatePassword}>
Generate Password
</button>

<h3>{password}</h3>

</div>
</>
);

}

export default PasswordGenerator;