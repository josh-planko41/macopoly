import React, { Component } from 'react'

import './styles/App.css';
import PlayerSelect from './containers/PlayerSelect.js';
import { HomePage, Credits } from './components/HomePage.js';
import Board from './components/Board.jsx';
import './styles/Board.css';
import { properties as BOARD } from './containers/Properties';
import Dice from './components/Dice.js';
import Buy from "./components/Buy.js";
import PayRent from './components/PayRent.js';

class App extends Component {
  state = {
    balancePlayer1: 1500,
    balancePlayer2: 1500,
    showPlayerSelect: false,
    players: [],
    gameStarted: false,
    selectedPropertyBuy : null,
    selectedPropertyPayRent : null,
    showCredits: false,

    // Added simple game state
    currentPlayer: 1,
    square: null,
    lastDice: [1, 1],
    lastRoll: 2,
  };

  handlePlay = () => {
    this.setState({ showPlayerSelect: true });
  }

  handleCredits = () => {
      this.setState({ showCredits: true });
    }

  startGame = (players) => {
    // Tried to normalize incoming players so they have location/balance/number. Not really sure about this code
    const normalized = players.map((p, idx) => ({
      number: p.number ?? (idx + 1),
      pawn: p.pawn ?? p.color ?? 'red',
      location: p.location ?? 0,
      ...p
    }));

    this.setState({ players: normalized, gameStarted: true });
  }



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
      score: Math.max(0, (active.score ?? 0) + increaseScore),
    };

    return {
      players: [...others, updated].sort((a, b) => a.number - b.number),
      square: {
        name_sqaure: BOARD[newLocation].name,
        last_move: {
          initial_square: BOARD[active.location].name,
          final_square: BOARD[newLocation].name
        },
      },
      lastRoll: total,
      selectedPropertyBuy: landingSquare.price && !landingSquare.owner ? landingSquare : null,
      selectedPropertyPayRent: landingSquare.owner && landingSquare.owner != prevState.currentPlayer ? landingSquare : null,
    };
  });
};

  /**
 * Buying: set owner and deduct from the **active** player's balance.
 */
handleConfirmBuy = (player, property) => {
  this.setState(prev => {
    const isP1 = prev.currentPlayer === 1;
    // assign owner (mutating BOARD entry is OK in your setup, but we still do it here)
    property.owner = player.number;
    return {
      balancePlayer1: isP1 ? prev.balancePlayer1 - property.price : prev.balancePlayer1,
      balancePlayer2: !isP1 ? prev.balancePlayer2 - property.price : prev.balancePlayer2,
      selectedPropertyBuy: null
    };
  });
};

handleCancelBuy = () => {
  this.setState({ selectedPropertyBuy: null });
};

handleConfirmPayRent = (property) => {
  this.setState(prev => {
    const payerIsP1 = prev.currentPlayer === 1;

    const price = property.price;

    const balancePlayer1 = prev.balancePlayer1;
    const balancePlayer2 = prev.balancePlayer2;

    const newBalanceP1 = payerIsP1 ? 
    balancePlayer1 - price : balancePlayer1 + price;

    const newBalanceP2 = payerIsP1 ? 
    balancePlayer2 + price : balancePlayer2 - price;
    
    return {
      balancePlayer1 : newBalanceP1,
      balancePlayer2 : newBalanceP2,
      selectedPropertyPayRent : null,
    }
  })
};

handleLookingForOtherOptions = (property) => {
  //TODO: This is just temporary code when the player cannot afford the rent. Add more features, such as liquidate properties and bankruptcy, later.
  this.setState({ selectedPropertyPayRent : null });
}

// Flip turn only when player clicks "Finish Turn"
handleFinishTurn = () => {
  this.setState(prev => ({
    currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
    // optional: keep square highlight or clear it
    square: prev.square,
  }));
};


  render() {
    const { showPlayerSelect, gameStarted, showCredits } = this.state;
  
    if (gameStarted) {
      return (
        <div className="App">
          <Dice state = {this.state}
            onRoll={(total, dice) => {
              this.setState({ lastRoll: total, lastDice: dice })
              this.movePlayer(total);
              } 
             }
             onFinishTurn={this.handleFinishTurn} 
          />

          <Board state={this.state} />

          {this.state.selectedPropertyBuy && (
            <Buy
              property = {this.state.selectedPropertyBuy}
              player = {this.state.players.find(
                (p) => p.number === this.state.currentPlayer
              )}
              onConfirm = {this.handleConfirmBuy}
              onCancel = {this.handleCancelBuy}
            />
          )}

          {this.state.selectedPropertyPayRent && (
            <PayRent
              property = {this.state.selectedPropertyPayRent}
              payer = {this.state.players.find(
                (p) => p.number === this.state.currentPlayer
              )}
              payee = {this.state.players.filter(
                (p) => p.number != this.state.currentPlayer
              )}
              onConfirm = {this.handleConfirmPayRent}
              onLookingForOtherOptions = {this.handleLookingForOtherOptions}
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

    if (showCredits) {
      return (
        <div className="App">
          <Credits/>
        </div>
      );
    }

    return (
      <div className="App">
        <HomePage onPlay={this.handlePlay} credits={this.handleCredits} />
      </div>
    );
  }
}

export default App;
