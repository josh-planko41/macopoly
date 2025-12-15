/**
 * Function for creating the window when a player lands on a Chance square.
 * 
 * @param {string} chanceCardName - The name of the chance card that was drawn.
 * @param {function} onAccept - The function to call when the player accepts the chance card.
 */
export default function Chance({ chanceCardName, onAccept }) {
  return (
    <div className="payTax-window">
      <h3>
        You landed on a Chance square!  
        <br />
        Chance card: <strong>{chanceCardName}</strong>
      </h3>

      <button onClick={() => onAccept()}>Okay</button>
    </div>
  );
}