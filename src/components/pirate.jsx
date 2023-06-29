const Pirate = ({ className, sound, onClick }) => {

  return (
    <div onClick={onClick}>
      <div className={className}></div>
      <audio src={sound}></audio>
    </div>
  )
};

export default Pirate;