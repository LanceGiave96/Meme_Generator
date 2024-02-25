import React from "react"
import MemeText from "./MemeText.jsx"

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
            FirstText: "",
            SecondText: "",
            ThirdText: "",
            FourthText: "",
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
                <MemeText placeholder="First Text..." text="FirstText" handleText={handleText}/>
                <MemeText placeholder="Second Text..." text="SecondText" handleText={handleText}/>
                <MemeText placeholder="First Text..." text="ThirdText" handleText={handleText}/>
                <MemeText placeholder="First Text..." text="FourthText" handleText={handleText}/>
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
                                            <h2 className="meme--text top-left">{meme.FirstText}</h2>
                                            <h2 className="meme--text top-right">{meme.SecondText}</h2>
                                            <h2 className="meme--text bottom-left">{meme.ThirdText}</h2>
                                            <h2 className="meme--text bottom-right">{meme.FourthText}</h2>
                                        </div>
                                    ) 
                
            }
            
        </main>
        
    )
}