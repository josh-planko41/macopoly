import React from 'react';
import PlayButton from './PlayButtons.js';
import CreateGamePage from './GamePage.js';


export default function HomePage() {
  const [showGame, setShowGame] = React.useState(false);

  const handlePlayClick = () => {
    setShowGame(true);
  };

  const handleBackClick = () => {
    setShowGame(false);
  }

  if (showGame) {
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