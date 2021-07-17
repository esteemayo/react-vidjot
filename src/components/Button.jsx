import PropTypes from 'prop-types';

const Button = ({ icon, text, type, size, color, onClick }) => {
  return (
    <button
      type={type}
      className={`btn btn-${color} ${size} text-uppercase`}
      onClick={onClick}
    >
      {text} {icon}
    </button>
  );
};

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
  type: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
