import React from "react";
import "./Board.css";


export default function Board() {

    const squares = [
    {name : "Free Parking", color : "white"},
    {name : "Hayden Courts", color : "red"},
    {name : "Chance", color : "white"},
    {name : "Nicholson Field", color : "red"},
    {name : "Macalester Stadium", color : "red"},
    {name : "B Line", color : "gray"},
    {name : "President's Home", color : "#FFFF00"},
    {name : "Weyerhaeuser Memorial Chapel", color : "#FFFF00"},
    {name : "Public Safety", color : "black"},
    {name : "Old Main", color : "#FFFF00"},
    {name : "Go To Duprison", color : "white"},
    {name : "Carnegie Hall", color : "#F7B16B"},
    {name : "Dewitt Wallace Library", color : "#92C47D"},
    {name : "Weyerhaeuser Hall (Adimission Office)",color : "#F7B16B"},
    {name : "Olin-Rice Science Center", color : "#92C47D"},
    {name : "Community Chest", color : "white"},
    {name : "Community Chest", color : "white"},
    {name : "Humanities", color : "#F7B16B"},
    {name : "Campus Center", color : "#92C47D"},
    {name : "A Line", color : "gray"},
    {name : "Green Line", color : "gray"},
    {name : "Grand Cambridge Apartments", color : "#C27BA0"},
    {name : "Chance", color : "white"},
    {name : "George Draper Dayton Hall", color : "#C27BA0"},
    {name : "Janet Wallace Fine Arts Center", color : "#3B77D8"},
    {name : "Facilities", color : "black"},
    {name : "MacBooks", color : "white"},
    {name : "Kirk Hall", color : "#C27BA0"},
    {name : "Leonard Center", color : "#3B77D8"},
    {name : "Duprison + Just Visiting", color : "white"},
    {name : "30 Mac", color : "#6EA8DC"},
    {name : "Wallace Hall", color : "#6EA8DC"},
    {name : "Chance", color : "white"},
    {name : "Bigelow Hall", color : "#6EA8DC"},
    {name : "Route 63", color : "gray"},
    {name : "Activity Fee", color : "white"},
    {name : "Doty Hall", color : "#8E7CC3"},
    {name : "Community Chest", color : "white"},
    {name : "Turck Hall", color : "#8E7CC3"},
    {name : "Pass Go To the Left", color : "white"},
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
                        style = {{backgroundColor: square.color}}
                    >
                        {square.name}
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

