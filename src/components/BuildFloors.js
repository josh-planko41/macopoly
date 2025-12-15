
/**
 * Function of building floors on an owned property.
 * A player must own a whole color set to build floors on one of the properties.
 * @param {Array} buildableSets - Array of color sets that the player can build on.
 * @param {Array} properties - Array of property objects with details like color, floors, etc.
 * @param {Function} onBuild - Function to call when a player decides to build a floor on a property.
 * @param {Function} onClose - Function to call when the modal is closed.
 */
import React, { useState } from "react";

export default function BuildFloors({buildableSets, properties, onBuild, onClose}){


    const [selectedColor, setSelectedColor] = useState(null);

    //helper method to get which property we can build floors on given a set
    const getBuildablePropertiesForColor = (color) => {

        const group = properties.filter( (p) => p.color === color );
        //Build Evenly Rule
        const minFloors = Math.min(...group.map( (p) => p.floors || 0));

        const buildable = group.filter(
            (p) =>
            (p.floors || 0) === minFloors &&
            (p.floors || 0) < 4 &&
            !p.mortgaged
        );

        return buildable;

    };

    function getColorName(color) {
        const map = {
            "#8E7CC3": "Purple",
            "#6EA8DC": "Light Blue",
            "#C27BA0": "Pink",
            "#F7B16B": "Orange",
            "red": "Red",
            "#FFFF00": "Yellow",
            "#92C47D": "Green",
            "#3B77D8": "Navy Blue"
        };
        return map[color] || color;
    }

    function getFloorCost(color) {
        const costs = {
        "#8E7CC3": 50,  // Purple
        "#6EA8DC": 50,  // Light Blue
        "#C27BA0": 100, // Pink
        "#F7B16B": 100, // Orange
        "red": 150,     // Red
        "#FFFF00": 150, // Yellow
        "#92C47D": 200, // Green
        "#3B77D8": 200, // Navy Blue
        };
        return costs[color] || 50; // Default price if color not found
    }   

    if (!buildableSets || buildableSets.length === 0) {
        return (
            <div className="build-floors-modal">
                <p>No full color sets owned yet.</p>
                <button onClick={onClose}>Back</button>
            </div>
        );
    }

    // screen 1: choose a color set
    if (!selectedColor) {
        return (
            <div className="build-floors-modal">
                <h2>Choose a color to build on</h2>
                {/* ... existing color buttons map ... */}
                {buildableSets.map((color) => (
                    <button
                        key={color}
                        className="color-choice-button"
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color, /* ...styles... */ }}
                    >
                        {getColorName(color)} - Cost: {getFloorCost(color)} FP
                    </button>
                ))}
                
                <div style={{ marginTop: "1rem" }}>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
    }

    // screen 2: show properties for the chosen color
    const buildableProps = getBuildablePropertiesForColor(selectedColor);
    const cost = getFloorCost(selectedColor);

    return (
        <div className="build-floors-modal">
            <h2>{getColorName(selectedColor)}</h2>
            <p>Cost per floor: <strong>{cost} FP</strong></p>

            <div style={{ textAlign: "left", display:"inline-block" }}>
                {buildableProps.length === 0 ? (
                    <p>You must build evenly! Switch to the other property in this group.</p>
                ) : (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                    {properties
                        .filter(p => p.color === selectedColor)
                        .map((p) => {
                            const isBuildable = buildableProps.includes(p);
                            return (
                                <li key={p.index} style={{ marginBottom: "15px", borderBottom:"1px solid #eee", paddingBottom:"10px" }}>
                                    <div style={{fontWeight:"bold"}}>{p.name}</div>
                                    <div>Current Floors: {p.floors || 0}</div>
                                    
                                    {isBuildable ? (
                                        <button 
                                            style={{
                                                marginTop: "5px",
                                                backgroundColor: "#28a745",
                                                color: "white",
                                                padding: "5px 10px",
                                                border: "none",
                                                borderRadius: "4px",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => onBuild(p)}
                                        >
                                            Build Floor (-{cost} FP)
                                        </button>
                                    ) : (
                                        <span style={{ fontSize: "0.8em", color: "gray" }}>
                                            (Build on other properties first)
                                        </span>
                                    )}
                                </li>
                            );
                    })}
                    </ul>
                )}
            </div>

            <div style={{ marginTop: "1rem", borderTop: "2px solid black", paddingTop: "10px" }}>
                <button onClick={() => setSelectedColor(null)}>Back to colors</button>
                <button onClick={onClose} style={{ marginLeft: "0.5rem" }}>Done</button>
            </div>
        </div>
    );



}


