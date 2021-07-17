const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label> <span className='required'>*</span>
      <textarea
        {...rest}
        name={name}
        id={name}
        className='form-control'
      ></textarea>
      {error && <div className='alert alert-error'>{error}</div>}
    </div>
  );
};

export default TextArea;
