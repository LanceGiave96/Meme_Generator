import React from "react"
import MemesObject from "/public/memesData.js"

export default function Form(){

    const [allMemeImages,setMemeImages] = React.useState(MemesObject)
    const [meme,setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: ""
        }
    )

    const getRandomMeme = function(){
        
        let memesArray = allMemeImages.data.memes
        let random = Math.floor( Math.random() * memesArray.length )
        let url = memesArray[random].url
        setMeme( prevItem => (
            {
                ...prevItem,
                randomImage: url
            }
        )
        )
    
    }
    
    return(

        <main>
            <div className="form">
                <label className="form--label">Top text</label>
                <label className="form--label">Bottom text</label>
                <input 
                    type="text"
                    placeholder="Shut up"
                    className="form--input"
                />
                <input 
                    type="text"
                    placeholder="And take my money"
                    className="form--input"
                />
                <button 
                    className="form--button"
                    onClick={getRandomMeme}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            
            { 
                
                meme.randomImage && (
                                        <div className="meme--container" >
                                            <img src={meme.randomImage} className="image--meme" />
                                        </div>
                                    ) 
                
            }
            
        </main>
        
    )
}