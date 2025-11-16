/**
 * Players Component
 * Displays the list of players with their pawns in the player select screen
 */

import React from'react'

const Players = (props) => (
    <div className="players">
        {
         props.players.map(player => (
            <div key={player.number} className="player">
                <p>  Player {player.number}: </p>
                <img
                    className="player-pawn"
                    alt={player.pawn}
                    src={`/images/${player.pawn}-pawn.png`} />
            </div>
        ))
        }
    </div>
);

export default Players;


