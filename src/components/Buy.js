
/**
 * Function for buying a square when landing on an unowned property
 * @param {Object} player - The player who is considering buying the square
 * @param {Object} property - The property that the player is considering buying
 * @param {Function} onConfirm - The function to call when the player confirms the purchase
 * @param {Function} onCancel - The function to call when the player cancels the purchase
 */
export default function Buy({player, property, onConfirm, onCancel}){
    
    if (!player || !property) return null;

    return(
        <div className="buy-window">
            <h3>Would you like to buy {property.name}?</h3>
            <p>The price is {property.price} FP</p>
            <button onClick={() => onConfirm(player, property)}>Buy</button>
            <button onClick={() => onCancel()}>Cancel</button>     
        </div>
        );

}