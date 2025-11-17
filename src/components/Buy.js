import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import App from "../App";

export default function Buy({player, property, onConfirm, onCancel}){
    
    if (!player || !property) return null;

    return(
        <div className="buy-window">
            <h3>Would you like to buy {property.name}?</h3>
            <p>The price is {property.price}</p>
            <button onClick={() => onConfirm(player, property)}>Buy</button>
            <button onClick={() => onCancel()}>Cancel</button> 
            
        </div>
        );

}