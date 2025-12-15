
/**
 * Function for MacBooks and Activity Fee Squares
 * @param {Object} property - The property object containing the name and tax amount
 * @param {Function} onAccept - The function to be called when the user accepts the tax payment
 */

export default function PayTax ({property, onAccept}){

    return(
        <div className="payTax-window">
            <h3>You landed on {property.name}, the amount you need to pay is {property.taxAmount}FP</h3>
            <button onClick={() => onAccept(property)}>Well, Okay</button>
        </div>
        ); 
}