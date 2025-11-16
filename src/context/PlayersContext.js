import React, { createContext, Component } from 'react';

export const PlayersContext = createContext();

export class PlayersProvider extends Component {
  state = {
    pawns: ['bell', 'cow', 'insignia', 'pushball'],
    currentPlayerSelect: 1,
    players: [],
    readyToStart: false,
    gameStarted: false,
  };

  setPlayer = (pawn) => {
    const { players } = this.state;
    if (players.find(p => p.pawn === pawn)) {
      alert('This is what you get for being greedy - pick a different pawn! 🤬');
      window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    this.setState(prev => ({
      players: [...prev.players, { number: prev.currentPlayerSelect, pawn }],
      currentPlayerSelect: prev.currentPlayerSelect + 1,
      readyToStart: prev.currentPlayerSelect === 2,
    }));
  };

  startGame = () => this.setState({ gameStarted: true });
  resetPlayers = () => this.setState({
    pawns: ['bell', 'cow', 'insignia', 'pushball'],
    currentPlayerSelect: 1,
    players: [],
    readyToStart: false,
    gameStarted: false,
  });

  render() {
    const value = { ...this.state, setPlayer: this.setPlayer, startGame: this.startGame, resetPlayers: this.resetPlayers };
    return <PlayersContext.Provider value={value}>
        {this.props.children}
        </PlayersContext.Provider>;
  }
}
