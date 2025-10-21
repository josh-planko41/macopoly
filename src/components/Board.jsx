import React, {useState} from "react";
import "./Board.css";
import { properties } from '../containers/Properties.js';


export default function Board() {

    const [hoveredSquare, setHoveredSquare] = useState(null);

    const squares = properties; // list of properties from Properties.js

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
                        onMouseEnter={() => setHoveredSquare(square)}
                        onMouseLeave={() => setHoveredSquare(null)}
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
        <div className="board-scroll">
            <div className="board-container">
                <div className="board">{tilesForShowing}</div>
                {hoveredSquare && (
                <div className="tooltip">
                <strong>{hoveredSquare.name}</strong>
                {hoveredSquare.price && <p>Price: {hoveredSquare.price} FP</p>}
                {hoveredSquare.description && <p>{hoveredSquare.description}</p>}
                </div>
                )}
            </div>
        </div>
    );
}

