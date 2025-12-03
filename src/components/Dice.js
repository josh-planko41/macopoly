import React, { useState, useContext, Component } from 'react';
import '../styles/App.css';
import { PlayersContext } from '../context/PlayersContext';   
import Players from './Players';

export default function Roll({ onRoll, onMove, onFinishTurn, state, rolledDoubles }) {
  const diceImages = { 1:'d1', 2:'d2', 3:'d3', 4:'d4', 5:'d5', 6:'d6' };
  rolledDoubles = false;
  const { players } = useContext(PlayersContext);

  const [image, setNewImage] = useState(diceImages[1]);
  const [image2, setNewImage2] = useState(diceImages[1]);
  const [count, setCount] = useState(1);
  const [hasRolled, setHasRolled] = useState(false);
  

  const rollDice = () => {
    const randomNum1 = Math.floor(Math.random() * 6) + 1;
    const randomNum2 = Math.floor(Math.random() * 6) + 1;

    setNewImage(diceImages[randomNum1]);
    setNewImage2(diceImages[randomNum2]);
    setCount(randomNum1 + randomNum2);
    setHasRolled(true);
    if (randomNum1 == randomNum2) {
      rolledDoubles = true;
      setHasRolled(false);
    }
    if (onRoll) {
      onRoll(randomNum1 + randomNum2, [randomNum1, randomNum2], rolledDoubles);
    };

    console.log('players:', players);
  };

  const handleTurn = () => {
    if (onFinishTurn) onFinishTurn();
    setHasRolled(false);
  };

  return (
    <div>
      <center>
        <h1>Player {state.currentPlayer}'s turn</h1>
        <h2>You rolled: {count}</h2>
        <div className="container">
          <img className="imgSquare" src={`/images/diceImages/${image}.png`} alt="die 1" />
          <div style={{ width:'5px', display:'inline-block' }}></div>
          <img className="imgSquare" src={`/images/diceImages/${image2}.png`} alt="die 2" />
          {hasRolled ? (
            <button className="diceButton" onClick={handleTurn} style={{ marginLeft:'10px' }}>
            Finish Turn
            </button>
          ) : (
            <button className="diceButton" onClick={rollDice}>Roll Dice</button>
          )}
        </div>
      </center>
    </div>
  );
}




