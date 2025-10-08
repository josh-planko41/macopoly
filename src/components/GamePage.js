import React from 'react';
import '../App.css';
import Board from './Board';

// Test Code to replace with board
function GPText(){
    return (
       //  <p className="Description" id="HomePageDescription"> This is the home page .</p>
       <h1 className="Greeting"> This is the Game Page.</h1>
    );
}



export default function CreateGamePage(){
    return (
        <div className="GamePageBackground">
            <h1 className="Greeting" id="GamePageTitle"> This is the Game Page - In Progress</h1>
            <Board />
            <button className="PlayButton" onClick={() => window.location.reload()}> Back to Home </button>
            {/* Replace the above two components with the actual game board and related components later */}
        </div>
    )
}