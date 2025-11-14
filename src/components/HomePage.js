/**
 * Home Page Component
 * Displays welcome message and Play button
 * Calls onPlay callback when Play button is clicked
 */

import React from 'react';

function Credits() {

  return (
    <div className="BackgroundImage">
      
      <h1 className = "Greeting"> Credits and Acknowledgments</h1>
  
      <p1 className = "contributors"> Contributors: <br/> 
        Josh Planko - Project/Product Manager, Graphic Designer <br/>
        Chenhao Ma - Technical Lead <br />
        Bavo Vandenhoeck - UX Developer<br />
        Karim Amra - Back-End Developer<br />
        Colin Mathews - Tester, Writer
      </p1>
      <p2> Acknowledgments: <br/>
        Thank you to Lian Duan for teaching our COMP 225 class and for all the guidance <br/>
        throughout our progress in this project. Thank you to preceptors Makol and Karla <br/>
        for their help in facilitating group work and providing advice on project management, <br/>
        learning new languages, and offering support throughout the development process.
      </p2>
    </div>
  )
}

function HomePage({ onPlay, credits }) {

  return (
    <div className="BackgroundImage">
      <h1 className="Greeting" id="HomePageTitle"> Welcome to Macopoly!</h1>
      <p className="Description" id="HomePageDescription">
        This is the home page for our project for <i>COMP225</i>, Fall 2025.
        Created by Josh, Chenhao, Bavo, Karim, and Colin.
      </p>
      <button id="pb" className="PlayButton" onClick={onPlay}> Play! </button>
      <button id="credits" className="credit-button" onClick = {credits}> Credits </button>
    </div>
  );
}

export { HomePage, Credits};