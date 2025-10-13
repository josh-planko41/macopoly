import React from "react";
import "./Board.css";


export default function Board() {

    const squares = [
    {name : "Free Parking", color : "white", price : null, owner: null},
    {name : "Hayden Courts", color : "red", price : 220, owner: null},
    {name : "Chance", color : "white", price : null, owner: null},
    {name : "Nicholson Field", color : "red", price : 220, owner: null},
    {name : "Macalester Stadium", color : "red", price : 240, owner: null},
    {name : "B Line", color : "gray", price : 200, owner: null},
    {name : "President's Home", color : "#FFFF00", price : 260, owner: null},
    {name : "Weyerhaeuser Memorial Chapel", color : "#FFFF00", price : 260, owner: null},
    {name : "Public Safety", color : "black", price : 150, owner: null},
    {name : "Old Main", color : "#FFFF00", price : 280, owner: null},
    {name : "Go To Duprison", color : "white", price : null, owner: null},
    {name : "Carnegie Hall", color : "#F7B16B", price : 200, owner: null},
    {name : "Dewitt Wallace Library", color : "#92C47D", price : 300, owner: null},
    {name : "Weyerhaeuser Hall (Adimission Office)",color : "#F7B16B", price : 180, owner: null},
    {name : "Olin-Rice Science Center", color : "#92C47D", price : 300, owner: null},
    {name : "Community Chest", color : "white", price : null, owner: null},
    {name : "Community Chest", color : "white", price : null, owner: null},
    {name : "Humanities", color : "#F7B16B", price : 180, owner: null},
    {name : "Campus Center", color : "#92C47D", price : 320, owner: null},
    {name : "A Line", color : "gray", price : 200, owner: null},
    {name : "Green Line", color : "gray", price : 200, owner: null},
    {name : "Grand Cambridge Apartments", color : "#C27BA0", price : 160, owner: null},
    {name : "Chance", color : "white", price : null, owner: null},
    {name : "George Draper Dayton Hall", color : "#C27BA0", price : 140, owner: null},
    {name : "Janet Wallace Fine Arts Center", color : "#3B77D8", price : 350, owner: null},
    {name : "Facilities", color : "black", price : 150, owner: null},
    {name : "MacBooks", color : "white", price : 75, owner: null},
    {name : "Kirk Hall", color : "#C27BA0", price : 140, owner: null},
    {name : "Leonard Center", color : "#3B77D8", price : 400, owner: null},
    {name : "Duprison + Just Visiting", color : "white", price : null, owner: null},
    {name : "30 Mac", color : "#6EA8DC", price : 120, owner: null},
    {name : "Wallace Hall", color : "#6EA8DC", price : 100, owner: null},
    {name : "Chance", color : "white", price : null, owner: null},
    {name : "Bigelow Hall", color : "#6EA8DC", price : 100, owner: null},
    {name : "Route 63", color : "gray", price : 200, owner: null},
    {name : "Activity Fee", color : "white", price : 200, owner: null},
    {name : "Doty Hall", color : "#8E7CC3", price : 60, owner: null},
    {name : "Community Chest", color : "white", price : null, owner: null},
    {name : "Turck Hall", color : "#8E7CC3", price : 60, owner: null},
    {name : "Pass Go To the Left", color : "white", price : null, owner: null},
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
                        <div className="square-name">{square.name}</div>
                        
                        <div className="square-price">{square.price != null && (
                            <>
                                {`Price: ${square.price}FP ${square.name === "Activity Fee" ? "or pay 10% net worth" : ""}`}
                            </>
                        )}</div>
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

