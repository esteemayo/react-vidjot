const Input = ({ name, label, error, type = 'text', ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label> <span className='required'>*</span>
      <input
        {...rest}
        type={type}
        id={name}
        name={name}
        className='form-control'
      />
      {error && <div className='alert alert-error'>{error}</div>}
    </div>
  );
};

export default Input;
