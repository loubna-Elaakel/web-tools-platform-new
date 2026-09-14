import React,{useState} from "react"
import Hero from "../components/Hero"
import ToolsGrid from "../components/ToolsGrid"

function Home(){

const [search,setSearch]=useState("")

return(

<div>

<Hero search={search} setSearch={setSearch} />

<ToolsGrid search={search} />

</div>

)

}

export default Home