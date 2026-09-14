import React from "react"
import {FaSearch} from "react-icons/fa"

function SearchBar({search,setSearch}){

return(

<div className="search">

<FaSearch/>

<input
placeholder="Search tools..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

)

}

export default SearchBar
