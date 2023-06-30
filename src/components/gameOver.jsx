const GameOver = ({ score, highScore }) => {
  return (
    <div>
      <h3 className="lose-text">You Lose</h3>
      <div>Score: {score}</div>
      <div>Best: {highScore}</div>
    </div>
  )
};

export default GameOver;