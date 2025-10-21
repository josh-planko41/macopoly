import React from 'react';

export default function HomePage({ onPlay }) {
  return (
    <div>
      <div className="BackgroundImage"></div>
      <h1 className="Greeting" id="HomePageTitle"> Welcome to Macopoly!</h1>
      <p className="Description" id="HomePageDescription">
        This is the home page for our project for <i>COMP225</i>, Fall 2025.
        Created by Josh, Chenhao, Bavo, and Colin.
      </p>
      <button id="pb" className="PlayButton" onClick={onPlay}> Play! </button>
    </div>
  );
}