
export default function PayRent({property, onConfirm, onLookingForOtherOptions}){

    return(
        <div className="payRent-window">
            <h3>You landed on {property.name}, owned by {property.owner}</h3>
            <p>The rent you will pay is {property.price}</p>
            <button onClick={() => onConfirm(property)}>Pay the rent</button>
            <button onClick={() => onLookingForOtherOptions(property)}>I can't afford it</button>
        </div>
        );
}