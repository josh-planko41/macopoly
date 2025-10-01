import React from 'react';

export default function CreateGamePage(){
    return (
        <div>
            <GPText />
            <GPBackground />
            {/* Replace the above two components with the actual game board and related components later */}
        </div>
    )
}

// Test Code to replace with board
function GPText(){
    return (
        <h1 className="Greeting"> This is the Game Page.</h1>
    )
}

function GPBackground(){
    return (
        <div className='GamePageBackground'></div>
    )
}