import React from 'react';


// Test Code to replace with board
function GPText(){
    return (
       //  <p className="Description" id="HomePageDescription"> This is the home page .</p>
       <h1 className="Greeting"> This is the Game Page.</h1>
    );
}

function GPBackground(){
    return (
        <div className='GamePageBackground'></div>
    );
}

export default function CreateGamePage(){
    return (
        <div>
            <GPText />
            <GPBackground />
            {/* Replace the above two components with the actual game board and related components later */}
        </div>
    )
}

