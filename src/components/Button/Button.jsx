const Button = ({ handleClick, text }) => {
  return (
    <button className="load-btn" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
