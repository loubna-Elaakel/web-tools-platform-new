import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

function BackHome(){

return(

<div style={{

padding:"20px"

}}>

<Link to="/" style={{

textDecoration:"none",
color:"#2563eb",
fontWeight:"bold",
display:"flex",
alignItems:"center",
gap:"8px"

}}>

<FaArrowLeft/>

Back to Home

</Link>

</div>

)

}

export default BackHome