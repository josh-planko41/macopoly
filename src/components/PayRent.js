export default function PayRent({property, rent, onConfirm, onLookingForOtherOptions}){

    return(
        <div className="payRent-window">
            <h3>You landed on {property.name}, owned by Player {property.owner}</h3>
            <p>The rent you will pay is {rent}</p>
            <button onClick={() => onConfirm(rent)}>Pay the rent</button>
            <button onClick={() => onLookingForOtherOptions(property)}>I can't afford it</button>
        </div>
        );
}