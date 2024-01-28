import React from "react"

export default function Form(){

    const [memesArray,setMemeImages] = React.useState({})

    //Use effect with .then() operations (no asyncronous)
    /*
    React.useEffect(() => { 
        fetch("https://api.imgflip.com/get_memes")
            .then( res => res.json() )
                .then( data => {
                        setMemeImages(data.data.memes)
                    }
                )
    },[])
    */

    //Use effect using asincronous function (witnout .then())
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setMemeImages(data.data.memes)
        }
        getMemes()
    }, [])

    const [meme,setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            randomImage: ""
        }
    )
    
    const getRandomMeme = function(){
        
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
    
    function handleText(event){
        const {name,value} = event.target
        setMeme( prevItem => (

                {
                    ...prevItem,
                    [name]: value
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
                    placeholder="Type top text..."
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleText}
                />
                <input 
                    type="text"
                    placeholder="Type bottom text..."
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleText}
                />
                <button 
                    className="form--button"
                    onClick={getRandomMeme}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            
            { 
                //conditional rendering
                meme.randomImage && (
                                        <div className="meme--container" >
                                            <img src={meme.randomImage} className="image--meme" />
                                            <h2 className="meme--text top">{meme.topText}</h2>
                                            <h2 className="meme--text bottom">{meme.bottomText}</h2>
                                        </div>
                                    ) 
                
            }
            
        </main>
        
    )
}