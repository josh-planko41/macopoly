
/**
 * Function for paying rent to the square owners.
 * @param {Object} property - The property that the player landed on.
 * @param {number} rent - The amount of rent that the player needs to pay.
 * @param {Function} onConfirm - Function to be called when the player confirms paying the rent.
 * @param {Function} onLookingForOtherOptions - Function to be called when the player cannot afford the rent and wants to look for other options.
 */
export default function PayRent({property, rent, onConfirm, onLookingForOtherOptions}){

    return(
        <div className="payRent-window">
            <h3>You landed on {property.name}, owned by Player {property.owner}</h3>
            <p>The rent you will pay is {rent}</p>
            <button onClick={() => onConfirm(rent)}>Pay the rent</button>
            <button onClick={() => onLookingForOtherOptions(property)}>I can't afford it: Sell Property</button>
        </div>
        );
}