import React from "react"
import { Link } from "react-router-dom"
import "./navbar.css"

function Navbar(){

return(

<nav className="navbar">

<div className="logo">
WebTools
</div>

<div className="links">

<Link to="/">Home</Link>
<Link to="/">Tools</Link>
<Link to="/">Popular</Link>
<Link to="/">About</Link>

</div>

</nav>

)

}

export default Navbar