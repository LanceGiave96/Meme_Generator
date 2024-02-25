import React from "react"

export default function MemeText(props){
    return(
        <h2 
            className = { props.class }
            onMouseDown = { (event) => props.handleDrag(event) } 
        >
        {props.text}
        </h2>
    )
}