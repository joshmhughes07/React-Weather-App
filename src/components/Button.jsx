import { useContext } from "react"
import "./styling/ButtonStyling.css"
import { ThemeContext } from "./Context"

const Button = (props)=>{
    const Theme = useContext(ThemeContext)
    return (
        <button className={`Button ${Theme}`} onClick={props.onClick}>{props.children}</button>
    )
}


export { Button }