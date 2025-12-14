
/**
 * Function for MacBooks and Activity Fee Squares
 */

export default function PayTax ({property, onAccept}){

    return(
        <div className="payTax-window">
            <h3>You landed on {property.name}, the amount you need to pay is {property.taxAmount}FP</h3>
            <button onClick={() => onAccept(property)}>Well, Okay</button>
        </div>
        ); 
}