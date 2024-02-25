import React from "react"
import MemeText from "./MemeText.jsx"
import TextDrag from "./TextDrag.jsx"

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
    
    function handleDrag(event){
       
        event.preventDefault();
        
        // get the starting position of the cursor
        let startPosX = event.clientX;
        let startPosY = event.clientY;
        
        document.addEventListener('mousemove', mouseMove)
        
        document.addEventListener('mouseup', function(){
            document.removeEventListener('mousemove', mouseMove)
        })
        
        function mouseMove(e) {
            // calculate the new position
            let newPosX = startPosX - e.clientX;
            let newPosY = startPosY - e.clientY;
        
            // with each move we also want to update the start X and Y
            startPosX = e.clientX;
            startPosY = e.clientY;
        
            // set the element's new position:
            event.target.style.top = (event.target.offsetTop - newPosY) + "px";
            event.target.style.left = (event.target.offsetLeft - newPosX) + "px";
        }

    }

    return(

        <main>
            <div className="form">
                <MemeText placeholder="First Text..." text="FirstText" handleText={handleText} />
                <MemeText placeholder="Second Text..." text="SecondText" handleText={handleText} />
                <MemeText placeholder="First Text..." text="ThirdText" handleText={handleText} />
                <MemeText placeholder="First Text..." text="FourthText" handleText={handleText} />
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
                                            <TextDrag class="meme--text top-left" text={meme.FirstText} handleDrag={handleDrag}/>
                                            <TextDrag class="meme--text top-right" text={meme.SecondText} handleDrag={handleDrag}/>
                                            <TextDrag class="meme--text bottom-left" text={meme.ThirdText} handleDrag={handleDrag}/>
                                            <TextDrag class="meme--text bottom-right" text={meme.FourthText} handleDrag={handleDrag}/>
                                        </div>
                                    ) 
                
            }
            
        </main>
        
    )
}