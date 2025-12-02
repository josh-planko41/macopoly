import React, { Component } from 'react'

import './styles/App.css';
import PlayerSelect from './containers/PlayerSelect.js';
import { HomePage, Credits } from './components/HomePage.js';
import Board from './components/Board.jsx';
import './styles/Board.css';
import { properties as BOARD, properties } from './containers/Properties';
import Dice from './components/Dice.js';
import Buy from "./components/Buy.js";
import PayRent from './components/PayRent.js';
import PayTax from './components/PayTax.js';
import MakeATrade from './components/trade.js';

class App extends Component {
  state = {
    balancePlayer1: 1500,
    balancePlayer2: 1500,
    showPlayerSelect: false,
    players: [],
    gameStarted: false,
    selectedPropertyBuy : null,
    selectedPropertyPayRent : null,
    selectedPropertyPayTax : null,
    showCredits: false,
    rolledDoubles: false,

    // Added simple game state
    currentPlayer: 1,
    square: null,
    lastDice: [1, 1],
    lastRoll: 2,

    //added trade required variables
    showMakeATrade: false,
    propertiesPlayer1: [],
    propertiesPlayer2: [],

    //added trade required variables
    startATrade: false,
    player1PropesedProperty: null,
    player2PropesedProperty: null,
    tradedProperties: [],
  };

  // handleMakeATrade = () => {
  //   this.setState({ showMakeATrade: true });
    
  // }

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
      selectedPropertyPayTax: landingSquare.taxAmount ? landingSquare : null,
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
      selectedPropertyBuy: null,
      propertiesPlayer1: isP1 ? [...prev.propertiesPlayer1, property] : prev.propertiesPlayer1 ,
      propertiesPlayer2: !isP1 ? [...prev.propertiesPlayer2, property] : prev.propertiesPlayer2,
    };
  });
};

setPropertiesActive = (properties) => {
  for (let i = 0; i < properties.length; i++) {
    properties[i].isActive = true;
  }
}

setPropertiesInactive = (properties) => {
  for (let i = 0; i < properties.length; i++) {
    properties[i].isActive = false;
  }
}


removeProperty = (properties, property) => {
  return properties.filter((p) => p.name !== property.name);
};

  
handleTrade = () => {
 
 this.setState((prev) => {
  const propertyP1 = prev.tradedProperties.find(p => p.owner === 1);
  const propertyP2 = prev.tradedProperties.find(p => p.owner === 2);

    if (prev.currentPlayer === 1 && prev.startATrade === true) {
  
      this.setPropertiesActive(prev.propertiesPlayer1);
      propertyP2.owner = 1;  
      propertyP1.owner = 2;

      const newPlayer1Properties = prev.propertiesPlayer2.filter(
        (p) => p.owner === 1
      );
      const newPlayer2Properties = prev.propertiesPlayer2.filter(
        (p) => p.owner === 2
      );
      
      return {
        propertiesPlayer1: newPlayer1Properties,
        propertiesPlayer2: newPlayer2Properties,
        startATrade: false,
      };
    }

    if (prev.currentPlayer === 2 && prev.startATrade === true) {
      this.setPropertiesActive(prev.propertiesPlayer2);

      propertyP1.owner = 2;
      propertyP2.owner = 1;

      const newPlayer2Properties = prev.propertiesPlayer1.filter(
        (p) => p.owner === 2
      );

      const newPlayer1Properties = prev.propertiesPlayer1.filter(
        (p) => p.owner === 1
      );

      return {
        propertiesPlayer1: newPlayer1Properties,
        propertiesPlayer2: newPlayer2Properties,
        startATrade: false,        
      };

    }
    return {};
  });
};


handleUserTradeClick = (property) => {
  if (!this.state.startATrade) return;
  this.setState((prev) => {
    const updated = [...prev.tradedProperties, property];
    console.log("updated tradedProperties", updated);
    return { tradedProperties: updated };
    
  });
};


handleSell = (property) => {
  const price = property.price;
  if (this.state.currentPlayer === 1) {
    this.state.propertiesPlayer1 = this.removeProperty(this.state.propertiesPlayer1, property);
    this.state.balancePlayer1 += price;
  } else {
    this.state.propertiesPlayer2 = this.removeProperty(this.state.propertiesPlayer2, property);
    this.state.balancePlayer2 += price;
  }
};
handleCancelBuy = () => {
  this.setState({ selectedPropertyBuy: null });
};

handleConfirmPayRent = (rent) => {
  this.setState(prev => {

    const payerIsP1 = prev.currentPlayer === 1;

    const balancePlayer1 = prev.balancePlayer1;
    const balancePlayer2 = prev.balancePlayer2;

    const newBalanceP1 = payerIsP1 ? 
    balancePlayer1 - rent : balancePlayer1 + rent;

    const newBalanceP2 = payerIsP1 ? 
    balancePlayer2 + rent : balancePlayer2 - rent;
    
    return {
      balancePlayer1 : newBalanceP1,
      balancePlayer2 : newBalanceP2,
      selectedPropertyPayRent : null,
    }
  })
};

handleLookingForOtherOptions = (property) => {
  //TODO: This is just temporary code when the player cannot afford the rent. Add more features, such as liquidate properties and bankruptcy, later.
  // get price of the rent and prices of all properties owned by the player
  const rent = this.getRentForSquares(property);
  const isP1 = this.state.currentPlayer === 1;
  const playerBalance = isP1 ? this.state.balancePlayer1 : this.state.balancePlayer2;
  const playerProperties = isP1 ? this.state.propertiesPlayer1 : this.state.propertiesPlayer2;
  if (playerBalance >= rent) {
    alert("You can afford the rent! Please pay the rent.");
    return;
  }
  else if (playerProperties.length === 0 && playerBalance < rent) {
    alert("You have no properties to sell! You are bankrupt!");
    return;
  } else {
    // sell selected property
    <Board
            state={this.state}
            onSquareClick={this.handleSell()}
          />
  }
  // this.setState({ selectedPropertyPayRent : null });
}

handleAcceptPayTax = (property) => {
  this.setState(prev => {
    const payerIsP1 = prev.currentPlayer === 1;
    const taxAmount = property.taxAmount

    const balancePlayer1 = prev.balancePlayer1;
    const balancePlayer2 = prev.balancePlayer2;

    const newBalanceP1 = (payerIsP1 
      ? balancePlayer1 - taxAmount 
      : balancePlayer1)
    
    const newBalanceP2 = (payerIsP1
      ? balancePlayer2
      : balancePlayer2 - taxAmount
    )
    return{
      balancePlayer1 : newBalanceP1,
      balancePlayer2 : newBalanceP2,
      selectedPropertyPayTax : null,
    }
  })
}

// Flip turn only when player clicks "Finish Turn"
handleFinishTurn = () => {
  this.setState(prev => ({
    currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
    // optional: keep square highlight or clear it
    square: prev.square,
  }));
  console.log(this.state.rolledDoubles)
};

 getRentForSquares = (square) =>{

  if (square.color === 'gray'){
    const count = this.getRailroadsOwnedCount(square.owner);
    const rentTable = [25, 50, 100, 200];
    const index = count - 1;
    return rentTable[index];
  }
  if (square.baseRent) {
    //Temporary
    const baseRent = square.baseRent;
    
    return baseRent;
  }
 }

 checkOwnedSet = () =>{

  const colors = ["#8E7CC3", "#6EA8DC", "#C27BA0", "#F7B16B", "red", "#FFFF00", "#92C47D", "#3B77D8"];
  const buildable = [];

  for (const color of colors) {
    const group = properties.filter(p => p.color === color);
    const ownsGroup = group.every(p => p.owner === this.state.currentPlayer);

    if (ownsGroup) {
      buildable.push(color);
    }
  }

  return buildable;
 }

 getRailroadsOwnedCount = (owner) => {
  return properties.filter(function (sq) {
    return sq.color === 'gray' && sq.owner === owner;
  }).length;
 }


render() {
  const { showPlayerSelect, gameStarted, showCredits } = this.state;

  if (gameStarted) {
    return (
      <div className="App">
        <Dice
          state={this.state}
          onRoll={(total, dice, isDoubles) => {
            this.setState({
              lastRoll: total,
              lastDice: dice,
              rolledDoubles: isDoubles,   
            });
            this.movePlayer(total);
          }}
          onFinishTurn={this.handleFinishTurn}
        />

      <div className='trade'>
      <button onClick = {() => this.setState({startATrade: true})}>Make a Trade</button>
      <button onClick = {() => {
        this.setState({startATrade: false})
        this.state.tradedProperties = []
        }
      }
        
        >Finish Making a Trade</button>

      <button onClick = {() =>{
          
        this.handleTrade()
        
      }} >process trade</button>
      {/* <label>Current Player: {this.state.currentPlayer} propose a trade</label>
      <label >Opponent Player: {this.state.currentPlayer === 1 ? 2 : 1} do you accept this trade</label>
      <button onClick = {() => this.setState({startATrade: false})}>yes</button>
      <button onClick = {() => this.setState({startATrade: false})}>no</button> */}
      </div>

        <Board
          state={this.state}
          onSquareClick={this.handleUserTradeClick}
        />

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
            rent = {this.getRentForSquares(this.state.selectedPropertyPayRent)} // To Be Changed, actual rent payment will be determined by many factors
            onConfirm = {this.handleConfirmPayRent}
            onLookingForOtherOptions = {this.handleLookingForOtherOptions}
          />
        )}

        {this.state.selectedPropertyPayTax && (
          <PayTax
            property = {this.state.selectedPropertyPayTax}
            onAccept = {this.handleAcceptPayTax}
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

