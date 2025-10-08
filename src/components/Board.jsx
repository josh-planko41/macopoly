import React from "react";
import "./Board.css";


export default function Board() {

    const squares = [
    "Free Parking",
    "Hayden Courts",
    "Chance",
    "Nicholson Field",
    "Macalester Stadium",
    "B Line",
    "President's Home",
    "Weyerhaeuser Memorial Chapel",
    "Public Safety",
    "Old Main",
    "Go To Duprison",
    "Carnegie Hall",
    "Dewitt Wallace Library",
    "Weyerhaeuser Hall (Adimission Office)",
    "Olin-Rice Science Center",
    "Community Chest",
    "Community Chest",
    "Humanities",
    "Campus Center",
    "A Line",
    "Green Line",
    "Grand Cambridge Apartments",
    "Chance",
    "George Draper Dayton Hall",
    "Janet Wallace Fine Arts Center",
    "Facilities",
    "MacBooks",
    "Kirk Hall",
    "Leonard Center",
    "Duprison + Just Visiting",
    "30 Mac",
    "Wallace Hall",
    "Chance",
    "Bigelow Hall",
    "Route 63",
    "Activity Fee",
    "Doty Hall",
    "Community Chest",
    "Turck Hall",
    "Pass Go To the Left",
    
];
    let squares_index = 0;

    const total = 11 * 11;
    const tilesForShowing = Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / 11);
        const col = i % 11;
        
        const isEdge = row === 0 || row === 10 || col === 0 || col === 10;
        if (isEdge) {
            const name = squares[squares_index];
            squares_index++;
            return <div key={i} className="square">{name}</div>;
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

