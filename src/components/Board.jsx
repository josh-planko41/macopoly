import React from "react";
import "./Board.css";


export default function Board() {

    const squares = [
    {name : "Free Parking", color : "white", price : null},
    {name : "Hayden Courts", color : "red", price : 220},
    {name : "Chance", color : "white", price : null},
    {name : "Nicholson Field", color : "red", price : 220},
    {name : "Macalester Stadium", color : "red", price : 240},
    {name : "B Line", color : "gray", price : 200},
    {name : "President's Home", color : "#FFFF00", price : 260},
    {name : "Weyerhaeuser Memorial Chapel", color : "#FFFF00", price : 260},
    {name : "Public Safety", color : "black", price : 150},
    {name : "Old Main", color : "#FFFF00", price : 280},
    {name : "Go To Duprison", color : "white", price : null},
    {name : "Carnegie Hall", color : "#F7B16B", price : 200},
    {name : "Dewitt Wallace Library", color : "#92C47D", price : 300},
    {name : "Weyerhaeuser Hall (Adimission Office)",color : "#F7B16B", price : 180},
    {name : "Olin-Rice Science Center", color : "#92C47D", price : 300},
    {name : "Community Chest", color : "white", price : null},
    {name : "Community Chest", color : "white", price : null},
    {name : "Humanities", color : "#F7B16B", price : 180},
    {name : "Campus Center", color : "#92C47D", price : 320},
    {name : "A Line", color : "gray", price : 200},
    {name : "Green Line", color : "gray", price : 200},
    {name : "Grand Cambridge Apartments", color : "#C27BA0", price : 160},
    {name : "Chance", color : "white", price : null},
    {name : "George Draper Dayton Hall", color : "#C27BA0", price : 140},
    {name : "Janet Wallace Fine Arts Center", color : "#3B77D8", price : 350},
    {name : "Facilities", color : "black", price : 150},
    {name : "MacBooks", color : "white", price : 75},
    {name : "Kirk Hall", color : "#C27BA0", price : 140},
    {name : "Leonard Center", color : "#3B77D8", price : 400},
    {name : "Duprison + Just Visiting", color : "white", price : null},
    {name : "30 Mac", color : "#6EA8DC", price : 120},
    {name : "Wallace Hall", color : "#6EA8DC", price : 100},
    {name : "Chance", color : "white", price : null},
    {name : "Bigelow Hall", color : "#6EA8DC", price : 100},
    {name : "Route 63", color : "gray", price : 200},
    {name : "Activity Fee", color : "white", price : 200 /* Or 10% of FP Balance */},
    {name : "Doty Hall", color : "#8E7CC3", price : 60},
    {name : "Community Chest", color : "white", price : null},
    {name : "Turck Hall", color : "#8E7CC3", price : 60},
    {name : "Pass Go To the Left", color : "white", price : null},
];

    let squares_index = 0;

    const total = 11 * 11;
    const tilesForShowing = Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / 11);
        const col = i % 11;
        
        const isEdge = row === 0 || row === 10 || col === 0 || col === 10;
        if (isEdge) {
            const square = squares[squares_index];
            squares_index++;
            return <div key={i} 
                        className="square"
                        style = {{backgroundColor: square.color,
                                color : square.color === "black" ? "white" : "black"
                        }}
                    >
                        {square.name}<br />
                        {square.price != null ? `Price: ${square.price}FP` : null}
                    </div>;
        }
        else{
            return <div key={i} className="empty"></div>;
        }
    });

    return (
        <div className="board-container">
            <div className="board">{tilesForShowing}</div>
        </div>
    );
}

