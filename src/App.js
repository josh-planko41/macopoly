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
import BuildFloors from './components/BuildFloors.js';
import GameOver from './GameOver.js';
import {chanceCards, collect, move, dMonearestUtilAnve, nearestTransitAndMove, leavePrison, imprison, payTo} from './containers/ChanceCards.js'
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
    gameOver: false,
    onChance: false,
    chanceCards: chanceCards,

    // Added simple game state
    currentPlayer: 1,
    square: null,
    lastDice: [1, 1],
    lastRoll: 2,

    //Build Floors variables
    showBuildFloors: false,

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

  /**
      * Move the active player to a new location based on the rolled total and update the state (indirectly throigh prevState) to reflect the player movement.
      * The new location is calculated by adding the rolled total to the current location of the active player.
      * If the new location is before the start of the board, the player passes "Go" and receives 200 dollars.
      * it determines the type of square the player landed on, and prompts the player to take the appropriate action:
        * If the new location is a property square and not owned, the active player can buy it.
        * If the new location is a property square and owned by the other player, the active player has to pay that player's rent.
        * If the new location is a "Pay Tax" square, the active player has to pay the tax amount.
      * The function also updates the active player's score based on the type of square they landed on.
      * @param {number} total - The rolled total.
   */
  movePlayer = (total) => { 
  if (typeof total !== 'number') {
    console.warn('movePlayer requires a rolled total. Roll first, then Move / Finish Turn.');
    return;

  }


  this.setState((prevState) => { //prevState is used instead of state to avoid mutating the state directly, and ensure that we are accessing the latest fully committed state (main state is asynchronous and might not be fully updated when we call setState).
    const active = prevState.players.find(p => p.number === prevState.currentPlayer);
    const others = prevState.players.filter(p => p.number !== prevState.currentPlayer);

    const newLocation = (active.location + total) % BOARD.length;
    const passedGo = newLocation < active.location;

    const balanceP1 = prevState.balancePlayer1;
    const balanceP2 = prevState.balancePlayer2;

    const updatedBalanceP1 =
      prevState.currentPlayer === 1 && passedGo ? balanceP1 + 200 : balanceP1;

    const updatedBalanceP2 =
      prevState.currentPlayer === 2 && passedGo ? balanceP2 + 200 : balanceP2;

    const landingSquare = BOARD[newLocation];
    const landingType = landingSquare?.type ?? landingSquare?.color;
    const increaseScore = landingType && landingType === active.pawn ? 2 : -1;

    const updated = {
      ...active,
      location: newLocation,
      score: Math.max(0, (active.score ?? 0) + increaseScore),
    };

    if (landingSquare.name === "Chance") {
      this.chance(newLocation);
    }

    return {
      players: [...others, updated].sort((a, b) => a.number - b.number),
      balancePlayer1: updatedBalanceP1,
      balancePlayer2: updatedBalanceP2,

      square: {
        name_sqaure: BOARD[newLocation].name,
        last_move: {
          initial_square: BOARD[active.location].name,
          final_square: BOARD[newLocation].name
        },
      },

      lastRoll: total,
      selectedPropertyBuy: landingSquare.price && !landingSquare.owner ? landingSquare : null,
      selectedPropertyPayRent: landingSquare.owner && landingSquare.owner !== prevState.currentPlayer ? landingSquare : null,
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
  this.handleGameOver();
};


/**
 * sets all properties to active, indicating the start of a trade
 * @param {List<Object>} properties - a list of properties
 */
setPropertiesActive = (properties) => {
  for (let i = 0; i < properties.length; i++) {
    properties[i].isActive = true;
  }
}
/**
 * sets all properties to inactive, indicating the end of a trade
 * @param {*} properties 
 */
setPropertiesInactive = (properties) => {
  for (let i = 0; i < properties.length; i++) {
    properties[i].isActive = false;
  }
}

/**
 * removes a property from the list of properties(proprties)
 * @param {*} properties  
 * @param {*} property
 */
removeProperty = (properties, property) => {
  return properties.filter((p) => p.name !== property.name);
};


/**
 * A callback that handles trade logic. It is called when the "Accept Trade" button is clicked,
 * and switches the traded properties between players.
 * In the end, it updates the state to reflect the new ownership of the properties, and sets the startATrade flag to false.
 */
handleAcceptTrade = () => {
  this.setState((prev) => {
    if (!prev.startATrade) return prev;

    const propertyP1 = prev.tradedProperties.find((p) => p.owner === 1);
    const propertyP2 = prev.tradedProperties.find((p) => p.owner === 2);

    if (!propertyP1 || !propertyP2) {
      console.warn("Need one property from each player before processing trade");
      return prev;
    }

    const p1Without = prev.propertiesPlayer1.filter(
      (p) => p.name !== propertyP1.name
    );
    const p2Without = prev.propertiesPlayer2.filter(
      (p) => p.name !== propertyP2.name
    );

    const p1AfterTrade = [ ...p1Without, { ...propertyP2, owner: 1 }];
    const p2AfterTrade = [...p2Without, { ...propertyP1, owner: 2 }];

    return {
      propertiesPlayer1: p1AfterTrade,
      propertiesPlayer2: p2AfterTrade,
      tradedProperties: [],
      startATrade: false,
    };
  });
};


/**
 * A callback that handles trade logic. It is called when the "Decline Trade" button is clicked,
 * and resets the traded properties and the startATrade flag.
 */
handleDeclineTrade = () => {
  this.setState((prev) => ({
    tradedProperties: [],
    startATrade: false
  }));
};


/**
 * A callback function that is called when the user clicks on a property to initiate a trade. 
 * It adds the clicked property to the tradedProperties array and updates the state with the newly traded properties.
 * @param {Object} property 
 * @returns 
 */
handleUserTradeClick = (property) => {
  if (!this.state.startATrade) return;
  this.setState((prev) => {
    const updated = [...prev.tradedProperties, property];
    console.log("updated tradedProperties", updated);
    return { tradedProperties: updated };
    
  });
};


/**
 * A callback function that is triggered when the game ends. 
 * It checks if either player has run out of money, and if this is the case, it sets the gameOver flag to true.
 * The gameOver flag is then used to render the GameOver component.
 */
handleGameOver = () => {
  
  if (this.state.balancePlayer1 <= 0 || this.state.balancePlayer2 <= 0) {
    this.setState({gameOver: true});
    return;
  }
}


handleSell = (property) => {
  const price = property.price;
  if (this.state.currentPlayer === 1) {
    this.state.propertiesPlayer1 = this.removeProperty(this.state.propertiesPlayer1, property);
    this.state.balancePlayer1 += price;
  } else {
    this.state.propertiesPlayer2 = this.removeProperty(this.state.propertiesPlayer2, property);
    this.state.balancePlayer2 += price;
  }

  this.handleGameOver();
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
  this.handleGameOver();
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

  this.handleGameOver();
}

chance = (location) => {
  // const chanceCardsExports = 
  console.log("chance cards")
  console.log("players location is: ", location)

  const activePlayer = this.state.players.find(
    p => p.number === this.state.currentPlayer
  );

  // Chance squares: 7, 22, 36
    // const randomIndex = Math.floor(Math.random() * chanceCards.length);

  const chosenCard = chanceCards[10];
  console.log("Chance Card Drawn: ", chosenCard.name);
  if (chosenCard.name === "Take Route 63 down Grand Ave") {
    
    this.setPlayerLocation(5)
  }

  if (typeof chosenCard.result === "function") {
    chosenCard.result(this.state.currentPlayer);
  }
  
};

setPlayerLocation = (destination) => {
   this.setState((prevState) => {
    const active = prevState.players.find(
      (p) => p.number === prevState.currentPlayer
    );
    const others = prevState.players.filter(
      (p) => p.number !== prevState.currentPlayer
    );

    const passedGo = destination < active.location;

    const landingSquare = BOARD[destination];

    const updatedPlayer = {
      ...active,
      location: destination,
    };

    return {
      players: [...others, updatedPlayer].sort((a, b) => a.number - b.number),

      balancePlayer1:
        prevState.currentPlayer === 1 && passedGo
          ? prevState.balancePlayer1 + 200
          : prevState.balancePlayer1,

      balancePlayer2:
        prevState.currentPlayer === 2 && passedGo
          ? prevState.balancePlayer2 + 200
          : prevState.balancePlayer2,

      square: {
        name_square: landingSquare.name,
        last_move: {
          initial_square: BOARD[active.location].name,
          final_square: landingSquare.name,
        },
      },

      selectedPropertyBuy:
        landingSquare.price && !landingSquare.owner ? landingSquare : null,

      selectedPropertyPayRent:
        landingSquare.owner &&
        landingSquare.owner !== prevState.currentPlayer
          ? landingSquare
          : null,

      selectedPropertyPayTax:
        landingSquare.taxAmount ? landingSquare : null,
      };
  } );
};


/**
 * A callback function that indicates the end of the player's turn.
 * It updates the state to switch to the next player and clears the square highlight.
 * It also checks if the game has ended.
 */
handleFinishTurn = () => {
  this.handleGameOver()

  this.setState(prev => ({

    currentPlayer: prev.currentPlayer === 1 ? 2 : 1,
    // optional: keep square highlight or clear it
    square: prev.square,
    
  }));
};

 getRentForSquares = (square) =>{

  if (square.color === 'gray'){
    const count = this.getRailroadsOwnedCount(square.owner);
    const rentTable = [25, 50, 100, 200];
    const index = count - 1;
    return rentTable[index];
  }

  if (square.color === "black"){
    const count = this.getBlackOwnedCount(square.owner);
    const multiplier = [4, 10];
    const index = count - 1;
    return multiplier[index] * (this.state.lastRoll);
  }

  if (square.baseRent) {

    const baseRent = square.baseRent;
    return baseRent;
    
  }
 }

 checkOwnedSet = (player) =>{

  const colors = ["#8E7CC3", "#6EA8DC", "#C27BA0", "#F7B16B", "red", "#FFFF00", "#92C47D", "#3B77D8"];
  const buildable = [];

  for (const color of colors) {
    const group = properties.filter(p => p.color === color);
    const ownsGroup = group.every(p => p.owner === player);

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

 getBlackOwnedCount = (owner) => {
  return properties.filter(function (sq) {
    return sq.color === 'black' && sq.owner === owner;
  }).length;
 }

 getFloorCost = (color) => {
    const costs = {
      "#8E7CC3": 50,  // Purple
      "#6EA8DC": 50,  // Light Blue
      "#C27BA0": 100, // Pink
      "#F7B16B": 100, // Orange
      "red": 150,
      "#FFFF00": 150, // Yellow
      "#92C47D": 200, // Green
      "#3B77D8": 200, // Navy Blue
    };
    return costs[color] || 100; // Default fallback
  }

 handleBuildFloor = (property) => {
    const cost = this.getFloorCost(property.color);
    const isP1 = this.state.currentPlayer === 1;
    const currentBalance = isP1 ? this.state.balancePlayer1 : this.state.balancePlayer2;

    // 1. Check if player has enough money
    if (currentBalance < cost) {
      alert(`You need ${cost} FP to build a floor here.`);
      return;
    }

    // 2. Check max floors (usually 4 houses + 1 hotel, or just 5 floors)
    if ((property.floors || 0) >= 4) {
      alert("Maximum floors reached for this property.");
      return;
    }

    // 3. Deduct balance and update property
    // Note: We are mutating the property object directly as per your existing pattern
    property.floors = (property.floors || 0) + 1;
    
    // Calculate rent increase (simple example logic, adjust as needed)
    property.baseRent = property.baseRent + (cost / 2); 

    this.setState((prev) => ({
      balancePlayer1: isP1 ? prev.balancePlayer1 - cost : prev.balancePlayer1,
      balancePlayer2: !isP1 ? prev.balancePlayer2 - cost : prev.balancePlayer2,

    }));
  };


render() {
  const { showPlayerSelect, gameStarted, showCredits, gameOver, onChance } = this.state;
  if(gameOver){
    return(
      <GameOver />
    )
  }
  if (onChance) {

  }
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
        <button
        onClick={() => {
          this.setState({
            startATrade: false,
            tradedProperties: [],
          });
        }}
      >
        Finish Making a Trade
      </button>

       
        {/* <label>Current Player: {this.state.currentPlayer} propose a trade</label>
        <label >Opponent Player: {this.state.currentPlayer === 1 ? 2 : 1} do you accept this trade</label>
        <button onClick = {() => this.setState({startATrade: false})}>yes</button>
        <button onClick = {() => this.setState({startATrade: false})}>no</button> */}
        </div>

        <button onClick={() => this.setState({showBuildFloors: true})}>Build Floors</button>

          <Board
            state={this.state}
            onSquareClick={this.handleUserTradeClick}
            handleAcceptTrade = {this.handleAcceptTrade}
            handleDeclineTrade = {this.handleDeclineTrade}
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

        {this.state.showBuildFloors && (
          <BuildFloors
            buildableSets={this.checkOwnedSet(this.state.currentPlayer)}
            properties={properties}
            currentPlayerBalance={
                this.state.currentPlayer === 1 
                ? this.state.balancePlayer1 
                : this.state.balancePlayer2
            }
            onBuild={this.handleBuildFloor}  // Pass the handler
            onClose={() => this.setState({ showBuildFloors: false })}
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




