import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (

    <div style={{background:"#111",padding:"20px"}}>

      <Link style={{color:"white"}} to="/">Home</Link>

    </div>

  );
}

export default Header;