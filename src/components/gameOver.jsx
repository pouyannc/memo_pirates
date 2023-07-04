const GameOver = ({ score, highScore, className }) => {
  return (
    <div className={className}>
      <h3 className="lose-text">Game Over</h3>
      <div>Score: {score}</div>
      <div>Best: {highScore}</div>
    </div>
  )
};

export default GameOver;