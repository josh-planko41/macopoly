import React from 'react';
import PlayButton from './PlayButtons.js';

function HomePageTitle() {
  return (
    <h1 className="Greeting"> Welcome to Macopoly!</h1>
  );
}

function HomePageDescription() {
  return (
    <p className="Description"> This is the home page for our project for <i>COMP225</i>, Fall 2025.
    Created by Josh, Chenhao, Bavo, and Colin.</p>
  );
}

function BackgroundImage() {
  return (
    <div className="BackgroundImage"></div>
  );
}



export default function HomePage(){
    return (
        <div>
            <BackgroundImage />
            <HomePageTitle />
            <HomePageDescription />
            <PlayButton />
        </div>
    )
}