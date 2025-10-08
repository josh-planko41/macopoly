import React from 'react';
import CreateGamePage from './GamePage.js';
import PlayerSelect from '../containers/PlayerSelect.js';


export default function HomePage() {
// State to track whether to show the game page, 
// got this from ChatGPT after asking how to do this in React
  const [startGame, setStartGame] = React.useState(false); 

  const handlePlayClick = () => {
    setStartGame(true);
  };

  if (startGame) {

    return <CreateGamePage />;
  }
  return (
    <div>
      <div className="BackgroundImage"></div>
      <h1 className="Greeting" id="HomePageTitle"> Welcome to Macopoly!</h1>
      <p className="Description" id="HomePageDescription">
        This is the home page for our project for <i>COMP225</i>, Fall 2025.
        Created by Josh, Chenhao, Bavo, and Colin.
      </p>
      <button id="pb" className="PlayButton" onClick={handlePlayClick}> Play! </button>

    </div>
  );
}