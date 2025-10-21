import React from'react'

const Players = (props) => (
    <div className="Players">
        {
         props.players.map(player => (
            <div key={player.number} className="Player">
                <p>Player {player.number}</p>
                <img
                    className="PlayerPawn"
                    alt={player.pawn}
                    src={`/images/${player.pawn}-pawn.png`} />
            </div>
        ))
        }
    </div>
);

export default Players;


