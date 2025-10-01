import React from 'react';
import CreateGamePage from './GamePage';

export default function PlayButton() {
    const handleClick = () => {
        RemoveHomeText();
        CreateGamePage();
    }

    return (
        <button id="pb" className="PlayButton" onClick={handleClick}> Play! </button>
    )
}



function RemoveHomeText(){
    const greeting = document.querySelector('.Greeting');
    const description = document.querySelector('.Description');
    const backgroungImg = document.querySelector('.BackgroundImage');
    const playButton = document.querySelector('.PlayButton');

    if (greeting) 
        greeting.textContent = '';
    if (description) {
        description.textContent = '';
        description.style.backgroundColor = 'rgb(255, 255, 255)';
    }
    if (backgroungImg) 
        backgroungImg.style.display = 'none';
    if (playButton) 
        playButton.remove();
}




