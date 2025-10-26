import React from 'react';
import '../App.css';
import {useState} from 'react';
import Img1 from '../diceImages/Number1.png';
import Image2 from "../diceImages/Number2.png";
import Image3 from "../diceImages/Number3.png";
import Image4 from "../diceImages/Number4.png";
import Image5 from "../diceImages/Number5.png";
import Image6 from "../diceImages/Number6.png";

export default function Roll({ onRoll, onMove }) {
    const diceImages = {
        1: Img1,
        2: Image2,
        3: Image3,
        4: Image4,
        5: Image5,
        6: Image6
    }
    const [image, setNewImage] = useState(diceImages[1])
    const [image2, setNewImage2] = useState(diceImages[1])
    const [count, setCount] = useState(1);
    const rollDice = () => {
        //Generates numbers
        var randomNum1 = Math.floor(Math.random() * 6) + 1;
        var randomNum2 = Math.floor(Math.random() * 6) + 1;
        setNewImage(diceImages[randomNum1]);
        setNewImage2(diceImages[randomNum2]);
        console.log(randomNum1, randomNum2);
        console.log(randomNum1 + randomNum2);
        setCount(randomNum1 + randomNum2);
        // Notify parent of new roll
        if (onRoll) onRoll(randomNum1 + randomNum2, [randomNum1, randomNum2]);
    };
    // Handler to tell parent to move using the stored total
    const handleMove = () => onMove && onMove(count);

    return (
        <div>
            <center>
                <h1>This is the dice roller</h1>
                <h2> You rolled: {count}</h2>
                <div className="container">
                    <img className='imgSquare' src={image}></img>
                    <div style={{width:'5px', display:'inline-block'}}></div>
                    <img className='imgSquare' src={image2}></img>
                    <button className='diceButton' onClick={rollDice}>Roll Dice</button>
                    {/* Move/finish turn button */}
                    <button className='diceButton' onClick={handleMove} style={{marginLeft:'10px'}}>
                        Move / Finish Turn
                    </button>
                </div>
            </center>
        </div>
    );
}