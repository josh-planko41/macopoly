/**
 * Home Page Component
 * Displays welcome message and Play button
 * Calls onPlay callback when Play button is clicked
 */

import React from 'react';

function HomePage({ onPlay }) {

  return (
    <div className="BackgroundImage">
      <h1 className="Greeting" id="HomePageTitle"> Welcome to Macopoly!</h1>
      <p className="Description" id="HomePageDescription">
        This is the home page for our project for <i>COMP225</i>, Fall 2025.
        Created by Josh, Chenhao, Bavo, Karim, and Colin.
      </p>
      <button id="pb" className="PlayButton" onClick={onPlay}> Play! </button>
    </div>
  );
}

export default HomePage;