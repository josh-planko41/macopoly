import React, { Component } from 'react';
import '../App.css';


class PlayerSelect extends Component {
    state = {
        pawns: ['bell', 'cow', 'ensign', 'pushball'],
        currentPlayerSelect: 1,
        players: []
    }

    setPlayer = (pawn) => {
        this.setState((prevState) => ({
            currentPlayerSelect: prevState.currentPlayerSelect + 1,
            players: [
                ...prevState.players, {
                    number: prevState.currentPlayerSelect, 
                    pawn
                }
            ]
        }));
    }

    render() {
        return (
            <div className="GamePageBackground">
                <h1> Player {this.state.currentPlayerSelect}, select your pawn: </h1>
                {
                    this.state.pawns.map(pawn => (
                        <img 
                            onClick={() => this.setPlayer(pawn)}
                            key={pawn} 
                            className="Pawn"
                            alt={pawn}
                            src={`./images/${pawn}-pawn.png`}/>
                    ))
                }
                <button className="PlayButton" onClick={() => window.location.reload()}> Back to Home </button>
            </div>
        );
    }
}

export default PlayerSelect;
