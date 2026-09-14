import React from "react"
import {Link} from "react-router-dom"

import {
FaLock,
FaFont,
FaBirthdayCake,
FaCode,
FaQrcode,
FaParagraph,
FaExchangeAlt,
FaRandom,
FaPercent,
FaKey,
FaCogs,
FaCopy,
FaSortAlphaDown,
FaUser,
FaPalette,
FaLink,
FaSearch,
FaImage,
FaFileAlt,
FaClock,
FaCalculator,
FaFilePdf,
FaIdCard,
FaCamera,
FaRulerCombined,
FaRobot
} from "react-icons/fa"

import "./tools.css"

function ToolsGrid({search}){

const tools=[

{ name:"Password Generator", path:"/password-generator", icon:<FaLock/> },
{ name:"Word Counter", path:"/word-counter", icon:<FaFont/> },
{ name:"Age Calculator", path:"/age-calculator", icon:<FaBirthdayCake/> },
{ name:"JSON Formatter", path:"/json-formatter", icon:<FaCode/> },
{ name:"QR Generator", path:"/qr-generator", icon:<FaQrcode/> },
{ name:"Lorem Generator", path:"/lorem-generator", icon:<FaParagraph/> },
{ name:"Case Converter", path:"/case-converter", icon:<FaExchangeAlt/> },
{ name:"Base64 tool", path:"/base64-Tool", icon:<FaKey/> },
{ name:"Random Number", path:"/random-number", icon:<FaRandom/> },
{ name:"Percentage Calculator", path:"/percentage-calculator", icon:<FaPercent/> },
{ name:"UUID Generator", path:"/uuid-generator", icon:<FaCogs/> },
{ name:"Text Repeater", path:"/text-repeater", icon:<FaCopy/> },
{ name:"Text Sorter", path:"/text-sorter", icon:<FaSortAlphaDown/> },
{ name:"Random Name Generator", path:"/random-name-generator", icon:<FaUser/> },
{ name:"Text Reverse", path:"/text-reverse", icon:<FaExchangeAlt/> },
{ name:"Random Color Generator", path:"/random-color-generator", icon:<FaPalette/> },
{ name:"URL Encoder", path:"/url-encoder", icon:<FaLink/> },
{ name:"Regex Tester", path:"/regex-tester", icon:<FaSearch/> },
{ name:"Image to Base64", path:"/image-to-base64", icon:<FaImage/> },
{ name:"Markdown Preview", path:"/markdown-preview", icon:<FaFileAlt/> },
{ name:"Timestamp Converter", path:"/timestamp-converter", icon:<FaClock/> },
{ name:"Simple Calculator", path:"/calculator", icon:<FaCalculator/> },

{ name:"CV Generator", path:"/cv-generator", icon:<FaIdCard/> },
{ name:"PDF Merge", path:"/pdf-merge", icon:<FaFilePdf/> },
{ name:"Image Compressor", path:"/image-compressor", icon:<FaCamera/> },
{ name:"Background Remover", path:"/background-remover", icon:<FaImage/> },
{ name:"Password Strength", path:"/password-strength", icon:<FaLock/> },


{name: "Text Compare", path: "/text-compare",icon: <FaExchangeAlt />},
{name: "Slug Generator",path: "/slug",icon: <FaLink />},
{name: "Color Picker",path: "/color",icon: <FaPalette />},
{name: "Unit Converter",path: "/unit",icon: <FaRulerCombined />},


 // AI
  { name:"AI Resume Generator", path:"/ai-resume-generator", icon:<FaRobot/> },
  { name:"AI Email Writer", path:"/ai-email", icon:<FaRobot/> },
  { name:"AI Paraphraser", path:"/ai-paraphraser", icon:<FaRobot/> },
  { name:"AI Product Description", path:"/ai-product", icon:<FaRobot/> },

]

const filteredTools = tools.filter(tool =>
tool.name.toLowerCase().includes(search.toLowerCase())
)

return(

<div className="tools">

{filteredTools.map((tool,index)=>(

<Link key={index} to={tool.path} className="card">

<div className="icon">
{tool.icon}
</div>

<h3>{tool.name}</h3>

</Link>

))}

</div>

)

}

export default ToolsGrid
