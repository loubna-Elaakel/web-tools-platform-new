import React from "react"
import { FaSearch } from "react-icons/fa"
import "./hero.css"

function Hero({search,setSearch}){

return(

<div className="hero">

<h1>Web Tools Platform</h1>

<p>
Free online tools for developers and designers
</p>

<div className="search-container">

<FaSearch className="search-icon"/>

<input
type="text"
placeholder="Search tools..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

</div>

)

}

export default Hero