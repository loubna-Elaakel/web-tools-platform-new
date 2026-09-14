import React from "react"

function Categories({setCategory}){

return(

<div>

<button onClick={()=>setCategory("All")}>All</button>

<button onClick={()=>setCategory("AI")}>
AI Tools
</button>

<button onClick={()=>setCategory("PDF")}>
PDF Tools
</button>

<button onClick={()=>setCategory("Image")}>
Image Tools
</button>

<button onClick={()=>setCategory("Developer")}>
Developer
</button>

</div>

)

}

export default Categories
