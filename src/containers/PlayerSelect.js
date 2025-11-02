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
      <div className="GamePageBackground">
        <div className="pawnsHomepage">
          <Players players={players} />
        </div>

        {readyToStart ? (
          <>
            <h1>Click Start to Begin!</h1>
            {/* ✅ wire to this.handleStart, not context.startGame */}
            <button className="StartButton" onClick={this.handleStart}>Start</button>
          </>
        ) : (
          <>
            <h1 className="PlayerSelect">Player {currentPlayerSelect}, select your pawn:</h1>
            {pawns.map(pawn => (
              <div key={pawn} className="PawnContainer" onClick={() => setPlayer(pawn)}>
                <img className="Pawn" alt={pawn} src={`/images/${pawn}-pawn.png`} />
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default PlayerSelect;
