import React, { Component } from 'react'

import './App.css';
import PlayerSelect from './containers/PlayerSelect.js'
import HomePage from './components/HomePage.js';
import Board from './components/Board.jsx';
import './components/Board.css';

class App extends Component {
  state = {
    showPlayerSelect: false,
    players: [],
    gameStarted: false,
  };

  handlePlay = () => {
    this.setState({ showPlayerSelect: true });
  }

  startGame = (players) => {
    this.setState({ players, gameStarted: true });
  }

  render() {
    const { showPlayerSelect, gameStarted } = this.state;

    if (gameStarted) {
      return (
        <div className="App">
          <Board players={this.state.players} />
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
