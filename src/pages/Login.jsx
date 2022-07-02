import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import { useGlobalContext } from '../context/GlobalState';
import { login } from '../services/authService';
import Button from '../components/Button';
import Input from '../components/Input';
import logo from '../img/logo.png';

const Login = () => {
  const { login: loginWithJWT } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: input }) => {
    const name = input.name;
    const value = input.value;
    setValues({ ...values, [name]: value });
  };

  const { email, password } = values;

  const validateForm = () => {
    const errors = {};

    if (email.trim() === '') {
      errors.email = 'Please provide your email address.';
    }

    if (password === '') {
      errors.password = 'Please provide a password.';
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
      const { data: jwt } = await login(values);
      loginWithJWT(jwt);
      window.location = '/ideas';
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const tempErrors = { ...errors };
        tempErrors.email = ex.response.data.message;
        tempErrors.password = ex.response.data.message;
        setErrors(tempErrors);
      }
    }
  };

  return (
    <div className='col-md-6 mx-auto'>
      <div className='card card-body'>
        <img src={logo} alt='VidJot' className='logo' />
        <h3 className='text-center'>Account Login</h3>
        <form onSubmit={handleSubmit}>
          <Input
            type='email'
            label='Email'
            name='email'
            placeholder='user@example.com'
            autoFocus
            value={email}
            onChange={handleChange}
            error={errors.email}
          />
          <Input
            type='password'
            name='password'
            label='Password'
            placeholder='********'
            minLength='8'
            value={password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button
            color='dark'
            text='Login'
            type='submit'
            size='btn-block'
            icon={<FaSignInAlt style={iconStyling} />}
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

export default Login;