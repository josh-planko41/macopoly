
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