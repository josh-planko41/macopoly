import React, { Component } from 'react';
import '../styles/App.css';
import Players from '../components/Players';
import { PlayersContext } from '../context/PlayersContext';

class PlayerSelect extends Component {
  static contextType = PlayersContext;

  handleStart = () => {
    const { players } = this.context;          
    this.props.startGame(players);          
  };

  render() {
    const {
      pawns,
      currentPlayerSelect,
      players,
      readyToStart,
      setPlayer
    } = this.context;

    return (
      <div className="player-select-background">
        <div className="pawns-homepage">
          <Players players={players} />
        </div>

        {readyToStart ? (
          <div>
            <button className="start-button" onClick={this.handleStart}>Start</button>
          </div>
        ) : (
          <>
            <h1 className="player-select">Player {currentPlayerSelect}, select your pawn:</h1>
            {pawns.map(pawn => (
              <div key={pawn} className="pawn-container" onClick={() => setPlayer(pawn)}>
                <img className="pawn" alt={pawn} src={`/images/${pawn}-pawn.png`} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default PlayerSelect;
