
import "./styling/ButtonStyling.css"

const Button = (props)=>{
    return (
        <button className="Button Background" onClick={props.onClick}>{props.children}</button>
    )
}


export { Button }