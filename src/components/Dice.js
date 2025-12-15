import React, { useState, useContext, Component } from 'react';
import '../styles/App.css';
import { PlayersContext } from '../context/PlayersContext';   
import Players from './Players';

/**
 * Dice Roll component for the game.
 * Handles rolling two dice, updating dice visuals, detecting doubles,
 * and triggering turn-related callbacks.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onRoll - Called after a roll with the total, dice values, and doubles flag.
 * @param {Function} props.onMove - (Optional) Moves the current player based on roll total.
 * @param {Function} props.onFinishTurn - Ends the current player's turn.
 * @param {Object} props.state - Global game state (used to access current player).
 * @param {boolean} props.rolledDoubles - Indicates whether the last roll was a double.
 *
 * @returns {JSX.Element} Dice roller UI for the current player.
 */
export default function Roll({ onRoll, onMove, onFinishTurn, state, rolledDoubles, imprisonedPlayer }) {
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
      //setHasRolled(false);
    }
    if (onRoll) {
      onRoll(randomNum1 + randomNum2, [randomNum1, randomNum2], rolledDoubles);
    };
    console.log('players:', players);
  };

  const handleTurn = () => {
    if (onFinishTurn)
    onFinishTurn();
    setHasRolled(false);
  };

  return (
    <div>
      <center>
        <h1 className = "dice-header"> Player {state.currentPlayer}'s turn</h1>
        <h2 className = "dice-subtext"> You rolled: {count}</h2>
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

