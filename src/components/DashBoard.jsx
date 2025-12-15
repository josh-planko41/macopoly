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
        <div className="dashboard">
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

            <div className='current-player'>
                <h1>Current Player: {state.currentPlayer}  </h1>
            </div>

           <div className="current-square">
                <h2>Current Square:</h2>
                <div>{state.square?.name_sqaure || ""}</div>
            </div>

            <div className="last-move">
                <h2>Last Move:</h2>
                <div>
                    {state.square?.last_move
                    ? `${state.square.last_move.initial_square} → ${state.square.last_move.final_square}`
                    : ""}
                </div>
            </div>

            <div className="balance">
                <h2>Balance Player 1: </h2>
                <div>
                    {state.balancePlayer1}
                </div>
            </div>


            <div className="balance">
                <h2>Balance Player 2: </h2>
                <div>
                    {state.balancePlayer2}
                </div>
            </div>

           <div className="balance">
            <h2>Rolled Doubles: </h2>
            <div>
                {state.rolledDoubles  == true ? "Yes" : "No"}
            </div>
           </div>
           
           <div className="balance">
            <h2>Player 1 Properties: </h2>
            <div>
                {state.propertiesPlayer1.map((property) => property.name).join(", ")}
            </div>
           </div>

           <div className="balance">
            <h2>Player 2 Properties: </h2>
            <div>
                {state.propertiesPlayer2.map((property) => property.name).join(", ")}
            </div>
           </div>


           <div className="balance">
            <h2>Traded Properties: </h2>
            <div>
                {state.tradedProperties.map((property) => property.name).join(", ")}
            </div>

            <button className = "dash-buttons" onClick={() => {handleAcceptTrade()}}>Accept</button>
            <button className = "dash-buttons" onClick={() => {handleDeclineTrade()}}>Decline</button>
           </div>
        </div>
        
    );
}
export default DashBoard;





















