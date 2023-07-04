const Pirate = ({ className, sound, onClick, disabled }) => {

  return (
    <button className='pirate-button' onClick={onClick} disabled={disabled}>
      <div className={className}></div>
      <audio src={sound}></audio>
    </button>
  )
};

export default Pirate;