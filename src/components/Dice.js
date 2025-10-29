/**
 * Dice Roller Component
 * Allows user to roll two dice and displays the result
 * Notifies parent component of the roll result via onRoll callback
 * Also has a button to notify parent to move/finish turn via onMove callback
 */

import React from 'react';
import '../styles/App.css';
import {useState} from 'react';

export default function Roll({ onRoll, onMove }) {
    const diceImages = {
        1: 'd1',
        2: 'd2',
        3: 'd3',
        4: 'd4',
        5: 'd5',
        6: 'd6'
    }
    const [image, setNewImage] = useState(diceImages[1])
    const [image2, setNewImage2] = useState(diceImages[1])
    const [count, setCount] = useState(1);
    
    const rollDice = () => {
        //Generates numbers
        var randomNum1 = Math.floor(Math.random() * 6) + 1;
        var randomNum2 = Math.floor(Math.random() * 6) + 1;

        // Sets images and count
        setNewImage(diceImages[randomNum1]);
        setNewImage2(diceImages[randomNum2]);
        setCount(randomNum1 + randomNum2);

        // Notify parent of new roll
        if (onRoll) onRoll(randomNum1 + randomNum2, [randomNum1, randomNum2]);
    };

    // Handler to tell parent to move using the stored total
    const handleMove = () => {
        if (onMove) {
           onMove(count);
        }
    }
    return (
        <div>
            <center>
                <h1>This is the dice roller</h1>
                <h2> You rolled: {count}</h2>
                <div className="container">
                    <img className='imgSquare' src={`/images/diceImages/${image}.png`}></img>
                    <div style={{width:'5px', display:'inline-block'}}></div>
                    <img className='imgSquare' src={`/images/diceImages/${image2}.png`}></img>
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



