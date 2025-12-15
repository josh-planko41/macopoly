/**
 * Home Page Component
 * Displays welcome message and Play button
 * Calls onPlay callback when Play button is clicked
 * Includes Credits button that calls credits callback when clicked
 * @param {function} onPlay - Callback function to handle Play button click
 * @param {function} credits - Callback function to handle Credits button click
 */

import React from 'react';

function HomePage({ onPlay, credits }) {

  return (
    <div className="background-image">
      <h1 className="greeting" id="HomePageTitle"> Welcome to Macopoly!</h1>
      <p className="description" id="HomePageDescription">
        Click the Play button to begin your Mac-opoly adventure! Click the credits button to 
        see the amazing contributors, acknowledgements, and resources behind this project, made
        for <i> COMP 225</i>. Click <a href="https://github.com/josh-planko41/macopoly/blob/main/RULES.md" 
        target = "_blank"> here </a> to read the RULES.md file, outlining all rules and aspects of the game. 
      </p>
      <button id="pb" className="play-button" onClick={onPlay}> Play! </button>
      <button id="credits" className="credit-button" onClick = {credits}> Credits </button>
    </div>
  );
}

function Credits() {

  return (
    <div className="credit-background">
      
      <h1 className = "credit-title"> Credits and Acknowledgments</h1>
  
      <p1 className = "contributors"> <b> <u> Contributors: </u> </b> <br/> 
        Josh Planko - Project/Product Manager, Graphic Designer <br/>
        Chenhao Ma - Technical Lead <br />
        Bavo Vandenhoeck - UX Developer<br />
        Karim Amra - Back-End Developer<br />
        Colin Mathews - Tester, Writer
      </p1>
      <p2 className = "acknowledgements"> <b> <u> Acknowledgments: </u> </b> <br/>
        Thank you to Lian Duan for teaching our <i>COMP 225</i> class and for all the <br/>
        guidance throughout our progress in this project. Thank you to preceptors <br/>
        Makol and Karla for their help in facilitating group work and providing <br/>
        advice on project management, learning new languages, and offering <br/>
        support throughout the development process.
      </p2>
      <p3 className = 'resources'> <b> <u> Resources and Links: </u> </b> <br/>
      <a href="https://github.com/josh-planko41/macopoly" target= "_blank" > GitHub Repository </a> <br/>
      <a href = "https://github.com/CodingGarden/front-end-opoly" target="_blank"> Front-End-Opoly Repository </a> <br/>
      <a href = "https://www.youtube.com/watch?v=zUkrx1Vd1G4" target = "_blank"> Front-End-Opoly Live Stream </a> <br/>
      <a href = "https://youtu.be/u-o30eBK3xs?si=hIFfRxiJ72mPuaXZ " target = "_blank"> Dice Roll Logic </a> <br/>
      <a href = "https://www.w3schools.com/" target = "_blank"> W3 tutorials (for JS, HTML, CSS, and React) </a>
      </p3>

      <button className = "return-button" onClick = {reload}> Return to Home </button>
    </div>
  )
}

function reload() {
  window.location.reload();
}

export {HomePage, Credits};