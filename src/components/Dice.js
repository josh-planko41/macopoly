import React from 'react';
import '../App.css';
import {useState} from 'react';

import Img1 from '../diceImages/Number1.png';
import Image2 from "../diceImages/Number2.png";
import Image3 from "../diceImages/Number3.png";
import Image4 from "../diceImages/Number4.png";
import Image5 from "../diceImages/Number5.png";
import Image6 from "../diceImages/Number6.png";


export default function Roll() {
    const diceImages = [Img1, Image2, Image3, Image4, Image5, Image6];

    const [image, setNewImage] = useState(diceImages[0])
    const [image2, setNewImage2] = useState(diceImages[1])

    const rollDice = () => {
        //Generates numbers
        var randomNum1 = Math.floor(Math.random() * 6);
        var randomNum2 = Math.floor(Math.random() * 6);
        setNewImage(diceImages[randomNum1]);
        setNewImage2(diceImages[randomNum2]);
    }

    return (
        <div>
            <center>
                <h1>This is the dice roller</h1>
                <div className="container">
                    <img className='imgSquare' src = {image}></img>
                <div style={{width:'5px', display:'inline-block'}}></div>
                    <img className='imgSquare' src = {image2}></img>
                    <button className='diceButton' onClick={rollDice}>Roll Dice</button>
                </div>
            </center>
        </div>
    )
}

function setNewImage() {
    
}