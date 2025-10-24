import React, { Component } from 'react';

import '../App.css';
import Players from '../components/Players.js';

class PlayerSelect extends Component {
    state = {
        pawns: ['bell', 'cow', 'ensign', 'pushball'],
        currentPlayerSelect: 1,
        players: [],
        readyToStart: false
    }

    setPlayer = (pawn) => {
        if(this.state.players.find(player => player.pawn === pawn)) {
            alert('This is what you get for being greedy - pick a different pawn! 🤬');
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        } else {
            this.setState((prevState) => ({
            currentPlayerSelect: prevState.currentPlayerSelect + 1,
            players: [
                ...prevState.players,
                {
                    number: prevState.currentPlayerSelect,
                    pawn
                }
            ],
            readyToStart: prevState.currentPlayerSelect === 2 ? true : false
        }));
        }
        
    }

    startGame = () => {
        this.props.startGame(this.state.players);
    }

    render() {
        return (
            <div className="GamePageBackground">
                <div className="pawnsHomepage">
                <Players players = {this.state.players} />
                </div>
                {
                    this.state.readyToStart ? 
                    <React.Fragment>
                        <h1> Click Start to Begin!</h1>
                        <button onClick={this.startGame} className="StartButton">Start</button>
                    </React.Fragment> : 
                    <React.Fragment>
                        <h1 className='PlayerSelect'> Player {this.state.currentPlayerSelect}, select your pawn: </h1>
                {
                    this.state.pawns.map(pawn => (
                        <div className="PawnContainer" key={pawn} onClick={() => this.setPlayer(pawn)}>
                        <img
                            className="Pawn"
                            alt={pawn}
                            src={`/images/${pawn}-pawn.png`} />
                            </div>
                    ))
                }
                    </React.Fragment>
                }
                {/* <button className="PlayButton" onClick={() => window.location.reload()}> Back to Home </button> */}
            </div>
        );
    }
}

export default PlayerSelect;
