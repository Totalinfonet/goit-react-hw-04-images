import PropTypes from 'prop-types';

const Button = ({ handleClick, text }) => {
  return (
    <button className="load-btn" onClick={handleClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
