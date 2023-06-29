const Header = ({ score, handleStart }) => {
  return (
    <div className="header">
      <div>Score: {score}</div>
      <h1>MEMORY PIRATES</h1>
      <button onClick={handleStart}>Play</button>
    </div>
  )
};

export default Header;