const Header = ({ score, handleStart, btnText, disabled }) => {
  return (
    <div className="header">
      <div className="score">{score}</div>
      <div className="title-container">
        <img className="title-icon" src="assets/jolly-roger.png" alt="" />
        <h1 className="title">MEMO PIRATES</h1>
      </div>
      <button onClick={handleStart} disabled={disabled} className="play-button">{btnText}</button>
    </div>
  )
};

export default Header;