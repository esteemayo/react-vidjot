import { useState } from 'react';
import { FaUser } from 'react-icons/fa';

import logo from 'img/logo.png';
import Input from 'components/Input';
import Button from 'components/Button';
import { registerInputs } from 'formData';
import { register } from 'services/userService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  passwordConfirm: '',
};

const Register = () => {
  const { login } = useGlobalAuthContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const { name, email, username, password, passwordConfirm } = values;

  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Please tell us your name.';
    }

    if (email.trim() === '') {
      errors.email = 'Please provide your email address.';
    }

    if (username.trim() === '') {
      errors.username = 'Please tell us your username.';
    }

    if (password === '') {
      errors.password = 'Please provide a password.';
    }

    if (password !== passwordConfirm) {
      errors.passwordConfirm = 'Passwords are not the same.';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setErrors({});

    try {
      const res = await register(values);
      login(res.headers['x-auth-token']);
      window.location = '/ideas';
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const tempErrors = { ...errors };
        tempErrors.name = ex.response.data.message;
        tempErrors.email = ex.response.data.message;
        tempErrors.username = ex.response.data.message;
        tempErrors.password = ex.response.data.message;
        tempErrors.passwordConfirm = ex.response.data.message;
        setErrors(tempErrors);
      }
    }
  };

  return (
    <div className='col-md-6 mx-auto'>
      <div className='card card-body'>
        <img src={logo} alt='VidJot' className='logo' />
        <h3 className='text-center'>Account Register</h3>
        <form onSubmit={handleSubmit}>
          <Input
            name='name'
            label='Name'
            placeholder='Enter your name'
            autoFocus
            value={name}
            onChange={handleChange}
            error={errors.name}
          />

          {registerInputs.map((input) => {
            const { id, name, type, label, placeholder } = input;
            return (
              <Input
                key={id}
                type={type}
                name={name}
                label={label}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                error={errors[name]}
              />
            );
          })}

          <Button
            color='dark'
            type='submit'
            text='Register'
            size='btn-block'
            icon={<FaUser style={iconStyling} />}
          />
        </form>
      </div>
    </div>
  );
};

const iconStyling = {
  color: '#007bff',
  fontSize: '0.8rem',
};

export default Register;
