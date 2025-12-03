/**
 * Board Component
 * Displays the game board with properties and player pawns
 */

import React, { useState, useContext } from "react";
import "../styles/Board.css";
import { properties } from "../containers/Properties.js";
import DashBoard from "./DashBoard.jsx";


export default function Board({ state, onSquareClick }) {
    
    const players = state.players;
    const [hoveredSquare, setHoveredSquare] = useState(null);

    const squares = properties; // list of properties from Properties.js

    let squares_index = 0;

    const total = 11 * 11;

    // Map a grid cell (row 0..10, col 0..10) to a property index (0..39) around perimeter
    const propertyIndexForCell = (row, col) => {
        // top row
        if (row === 0) return col;
        // right column (rows 1..9)
        if (col === 10) return 10 + row;
        // bottom row (row 10) right->left
        if (row === 10) return 20 + (10 - col);
        // left column (rows 9..1) bottom->top
        if (col === 0) return 31 + (9 - row);
        return null;
    };
    
    const tilesForShowing = Array.from({ length: total }, (_, i) => {
        const row = Math.floor(i / 11);
        const col = i % 11;

        const propIndex = propertyIndexForCell(row, col);


        if (propIndex !== null && properties[propIndex]) {
            const square = properties[propIndex];
            return (
                <div
                    key={i}
                    className="square"
                    style={{
                        backgroundColor: square.color,
                        color: square.color === "black" ? "white" : "black",
                    }}

                    onMouseEnter={() => setHoveredSquare(properties[propIndex])}
                    onMouseLeave={() => setHoveredSquare(null)}
                    onClick={() => {
                    if (onSquareClick) {
                        onSquareClick(properties[propIndex]);
                    }
                }}
                >
                    <div className="square-name">{properties[propIndex].name}</div>
                    
                    {square.owner === null 
                        ? <div className="square-price">
                            {square.price != null && (
                                <>
                                    {`Price: ${square.price}FP`}
                                </>
                            )}
                        </div>
                        : <div className="square-rent">
                            {square.baseRent != null && (
                                <>
                                    {`Rent: ${square.baseRent}FP`}<br />
                                    {`Floors: ${square.floors}`}
                                </>
                            )}
                        </div>
                    }

                    {square.taxAmount != null
                        ? <div className="square-price">
                            {square.taxAmount != null && (
                                <>
                                    {`TaxRate: ${square.taxAmount}`}
                                </>
                            )}
                        </div>
                        : null
                    }
                    
                    
                    {players.some(p => (p.location % properties.length) === propIndex) && (
                    <div className="player-pawns">
                        {players.filter(p => (p.location % properties.length) === propIndex)
                                .map(player => (
                            <img
                                key={player.number}
                                src={`/images/${player.pawn}-pawn.png`}
                                alt={player.pawn}
                                className="player-pawn-icon"
                            />
                        ))}
                    </div>
                    )}
                </div>
            );
        }

        return <div key={i} className="empty" />;
    });

    return (
            <div className="board-container">
                <div className="board">
                    {tilesForShowing}
                    <img
                        src="/images/macopoly-logo.png"
                        alt="Macopoly Logo"
                        className="macopoly-logo"
                    />
                </div>

                <DashBoard state={state} />
                {hoveredSquare && (
                    <div className="tooltip">
                        <strong>{hoveredSquare.name}</strong>
                        {hoveredSquare.owner === null 
                                ? hoveredSquare.price && <p>Price: {hoveredSquare.price} FP</p> 
                                : hoveredSquare.baseRent && <p>Base Rent: {hoveredSquare.baseRent} FP</p>
                        }
                        {hoveredSquare.taxAmount && <p>Tax Rate: {hoveredSquare.taxAmount} FP</p>}
                        {hoveredSquare.owner && <p>Owner: Player {hoveredSquare.owner}</p>}
                    </div>
                )}
            </div>
    );
}




