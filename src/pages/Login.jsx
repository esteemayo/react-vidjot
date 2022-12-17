import { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

import logo from 'img/logo.png';
import Input from 'components/Input';
import Button from 'components/Button';
import { login } from 'services/authService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const { login: loginWithJWT } = useGlobalAuthContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    if (!validateForm()) return;
    setErrors({});

    await handleLogin();
    await window.location.replace('/ideas');
  };

  const handleLogin = async () => {
    try {
      const { data: jwt } = await login(values);
      loginWithJWT(jwt);
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
