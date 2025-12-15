import React from 'react';
import "../styles/Board.css";
import { PlayersContext } from '../context/PlayersContext';


/**
 * DashBoard Component
 * Displays the game board with properties and player pawns. Uses state provided as props to show relevant game details for the users. 
 * Allows users to accept and decline trade forms inside the dashboard.
 * @param {Object} state - game state object
 * @param {Function} handleAcceptTrade - function to handle accepting a trade
 * @param {Function} handleDeclineTrade - function to handle declining a trade
 * @returns {JSX.Element}
 */
function DashBoard({ state, handleAcceptTrade, handleDeclineTrade }) {
    const players = state.players;
    return (
        <div className="DashBoard">
         <div className="player-pawns">
                        {players.map(player => (
                            <img
                                key={player.number}
                                src={`/images/${player.pawn}-pawn.png`}
                                alt={player.pawn}
                                className="player-pawn-icon"
                            />
                        ))}
            </div>

            <div className='CurrentPlayer'>
                <h1>Current Player: {state.currentPlayer}  </h1>
            </div>

           <div className="CurrentSquare">
                <h2>Current Square:</h2>
                <pre>{state.square?.name_sqaure || ""}</pre>
            </div>

            <div className="LastMove">
                <h2>Last Move:</h2>
                <pre>
                    {state.square?.last_move
                    ? `${state.square.last_move.initial_square} → ${state.square.last_move.final_square}`
                    : ""}
                </pre>
            </div>

            <div className="Balance">
                <h2>Balance Player 1: </h2>
                <pre>
                    {state.balancePlayer1}
                </pre>
            </div>


            <div className="Balance">
                <h2>Balance Player 2: </h2>
                <pre>
                    {state.balancePlayer2}
                </pre>
            </div>

           <div className="Balance">
            <h2>Rolled Doubles: </h2>
            <pre>
                {state.rolledDoubles  == true ? "Yes" : "No"}
            </pre>
           </div>
           
           <div className="Balance">
            <h2>Player 1 Properties: </h2>
            <pre>
                {state.propertiesPlayer1.map((property) => property.name)}
            </pre>
           </div>

           <div className="Balance">
            <h2>Player 2 Properties: </h2>
            <pre>
                {state.propertiesPlayer2.map((property) => property.name)}
            </pre>
           </div>


           <div className="Balance">
            <h2>Traded Properties: </h2>
            <pre>
                {state.tradedProperties.map((property) => property.name)}
            </pre>

            <button className = "dash-buttons" onClick={() => {handleAcceptTrade()}}>Accept</button>
            <button className = "dash-buttons" onClick={() => {handleDeclineTrade()}}>Decline</button>
           </div>
        </div>
        
    );
}
export default DashBoard;





















