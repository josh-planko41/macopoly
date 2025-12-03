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

                {buildableSets.map((color) => (
                    <button
                    key={color}
                    className="color-choice-button"
                    onClick={() => setSelectedColor(color)}
                    style={{
                        backgroundColor: color,
                        height: "40px",
                        borderRadius: "6px",
                        marginBottom: "10px",
                        border: "none",
                        cursor: "pointer"
                    }}
                    >{getColorName(color)}</button>
                ))}

                <div style={{ marginTop: "1rem" }}>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        );
    }

    // screen 2: show properties for the chosen color
    const buildableProps = getBuildablePropertiesForColor(selectedColor);

    return (
        <div className="build-floors-modal">
            <h2>{getColorName(selectedColor)} properties you can build on</h2>

            {buildableProps.length === 0 ? (
                <p>You can’t build any Floors on this color right now.</p>
                ) : (
                <ul>
                {buildableProps.map((p) => (
                    <li key={p.id}>
                    {p.name} – currently {p.floors || 0} floors
                    </li>
                ))}
                </ul>
            )}

            <div style={{ marginTop: "1rem" }}>
                <button onClick={() => setSelectedColor(null)}>Back to colors</button>
                <button onClick={onClose} style={{ marginLeft: "0.5rem" }}>Done</button>
            </div>
        </div>
    );






}


