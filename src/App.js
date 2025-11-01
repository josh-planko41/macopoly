import React, { Component } from 'react'

import './styles/App.css';
import PlayerSelect from './containers/PlayerSelect.js';
import HomePage from './components/HomePage.js';
import Board from './components/Board.jsx';
import './styles/Board.css';
import { properties as BOARD } from './containers/Properties';
import Roll from './components/Dice.js';
import Buy from "./components/Buy.js";

class App extends Component {
  state = {
    showPlayerSelect: false,
    players: [],
    gameStarted: false,
    selectedProperty : null,

    // Added simple game state
    currentPlayer: 1,
    square: null,
    lastDice: [1, 1],
    lastRoll: 2,
  };

  handlePlay = () => {
    this.setState({ showPlayerSelect: true });
  }

  startGame = (players) => {
    // Tried to normalize incoming players so they have location/score/number. Not really sure about this code
    const normalized = players.map((p, idx) => ({
      number: p.number ?? (idx + 1),
      pawn: p.pawn ?? p.color ?? 'red',
      location: p.location ?? 0,
      score: p.score ?? 0,
      ...p
    }));

    this.setState({ players: normalized, gameStarted: true });
  }

  // movePlayer function that incorporates Dice
  movePlayer = (total) => {
    if (typeof total !== 'number') {
      console.warn('movePlayer requires a rolled total. Roll first, then Move / Finish Turn.');
      return;
    }
  
    this.setState((prevState) => {
      const active = prevState.players.find(p => p.number === prevState.currentPlayer);
      const others = prevState.players.filter(p => p.number !== prevState.currentPlayer);
  
      const newLocation = (active.location + total) % BOARD.length;
      const landingSquare = BOARD[newLocation];
      const landingType = landingSquare?.type ?? landingSquare?.color;
      const increaseScore = landingType && landingType === active.pawn ? 2 : -1;
  
      const updated = {
        ...active,
        location: newLocation,
        score: Math.max(0, active.score + increaseScore),
      };
  
      return {
        players: [...others, updated].sort((a, b) => a.number - b.number),
        currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
        square: {
          player: updated.number,
          type: landingType,
          points: (increaseScore > 0 ? '+' : '') + increaseScore,
        },
        // Keep lastRoll in sync 
        lastRoll: total,
        //Trigger Buy Feature when applicable
        selectedProperty: landingSquare.price && !landingSquare.owner ? landingSquare: null,
      };
    });
  };

  /**
   * The Buying features.
   * Once confirm to buy, set owner to the current player, and deduct FP from curr player's account balance.
   * The player can also choose not to buy.
   * @param {*} player 
   * @param {*} property 
   */
  handleConfirmBuy = (player, property) => {
    property.owner = player.number;
    player.balance -= property.price;
    this.setState({ selectedProperty: null });
  };

  handleCancelBuy = () => {this.setState({ selectedProperty : null})};

  render() {
    const { showPlayerSelect, gameStarted } = this.state;
  
    if (gameStarted) {
      return (
        <div className="App">
          <Roll
            onRoll={(total, dice) => {
              this.setState({ lastRoll: total, lastDice: dice })
              this.movePlayer(total);
              } 
             } 
          />

          <Board players={this.state.players} />

          {this.state.selectedProperty && (
            <Buy
              property = {this.state.selectedProperty}
              player = {this.state.players.find(
                (p) => p.number === this.state.currentPlayer
              )}
              onConfirm = {this.handleConfirmBuy}
              onCancel = {this.handleCancelBuy}
            />
          )}

        </div>
      );
    }
  
    if (showPlayerSelect) {
      return (
        <div className="App">
          <PlayerSelect startGame={this.startGame} />
        </div>
      );
    }
  
    return (
      <div className="App">
        <HomePage onPlay={this.handlePlay} />
      </div>
    );
  }
}

export default App;
