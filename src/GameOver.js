import styles from "./styles/App.css";

const GameOver = () => {
  return (
    <div className="game-over">
      <h1 className="game-over-title">Game Over</h1>
      <p className="game-over-message">Unfortunately, you have run out of money and cannot continue playing.</p>
      <button className="game-over-button" onClick={() => window.location.reload()}>Play Again</button>   
    </div>
  );
};

export default GameOver;
