import React from "react";
import "./Board.css";


export default function Board() {

    const squares = [
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
    "Dewitt Wallace Library",
    "Olin-Rice Science Center",
    "Community Chest",
    "Campus Center",
    "Green Line",
    "Chance",
    "Janet Wallace Fine Arts Center",
    "MacBooks",
    "Leonard Center",
    "Pass Go To the Left",
    "Turck Hall",
    "Community Chest",
    "Doty Hall",
    "Activity Fee",
    "Route 63",
    "Bigelow Hall",
    "Chance",
    "Wallace Hall",
    "30 Mac",
    "Duprison + Just Visiting",
    "Kirk Hall",
    "Facilities",
    "George Draper Dayton Hall",
    "Grand Cambridge Apartments",
    "A Line",
    "Humanities",
    "Community Chest",
    "Weyerhaeuser Hall (Adimission Office)",
    "Carnegie Hall",
    "Free Parking",
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

