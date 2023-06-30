const Header = ({ score, handleStart, btnText }) => {
  return (
    <div className="header">
      <div>Score: {score}</div>
      <h1>MEMORY PIRATES</h1>
      <button onClick={handleStart}>{btnText}</button>
    </div>
  )
};

export default Header;