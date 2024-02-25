import React from "react"

export default function MemeText(props){
    return(
        <input 
            type="text"
            placeholder={props.placeholder}
            className="form--input"
            name={props.text}
            onChange={ (event) => props.handleText(event) }
        />
    )
}