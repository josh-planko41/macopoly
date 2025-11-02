import React, { useState, useContext } from 'react';
import '../styles/App.css';
import { PlayersContext } from '../context/PlayersContext';   

export default function Roll({ onRoll, onMove }) {
  const diceImages = { 1:'d1', 2:'d2', 3:'d3', 4:'d4', 5:'d5', 6:'d6' };

  const { players } = useContext(PlayersContext);

  const [image, setNewImage]   = useState(diceImages[1]);
  const [image2, setNewImage2] = useState(diceImages[1]);
  const [count, setCount]      = useState(1);

  const rollDice = () => {
    const randomNum1 = Math.floor(Math.random() * 6) + 1;
    const randomNum2 = Math.floor(Math.random() * 6) + 1;

    setNewImage(diceImages[randomNum1]);
    setNewImage2(diceImages[randomNum2]);
    setCount(randomNum1 + randomNum2);

    if (onRoll) onRoll(randomNum1 + randomNum2, [randomNum1, randomNum2]);

    console.log('players:', players);
  };

  const handleMove = () => {
    if (onMove) onMove(count);
  };

  return (
    <div>
      <center>
        <h1>This is the dice roller</h1>
        <h1>it is player 1's turn</h1>
        <h2>You rolled: {count}</h2>
        <div className="container">
          <img className="imgSquare" src={`/images/diceImages/${image}.png`} alt="die 1" />
          <div style={{ width:'5px', display:'inline-block' }}></div>
          <img className="imgSquare" src={`/images/diceImages/${image2}.png`} alt="die 2" />
          <button className="diceButton" onClick={rollDice}>Roll Dice</button>
          <button className="diceButton" onClick={handleMove} style={{ marginLeft:'10px' }}>
            Move / Finish Turn
          </button>
        </div>
      </center>
    </div>
  );
}