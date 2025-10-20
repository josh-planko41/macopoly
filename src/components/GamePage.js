import React from 'react';
import '../App.css';
import Board from './Board';

export default function CreateGamePage(){
    return (
        <div className="GamePageBackground">
            {/* <h1 className="Greeting" id="GamePageTitle"> This is the Game Page - In Progress</h1> */}
            <Board />
            <button className="PlayButton" onClick={() => window.location.reload()}> Back to Home </button>
            {/* Replace the above two components with the actual game board and related components later */}
        </div>
    )
}