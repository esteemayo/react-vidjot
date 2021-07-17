import { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import { updateUserPassword } from '../services/authService';
import { useGlobalContext } from '../context/GlobalState';
import Button from './Button';
import Input from './Input';

const UserPassword = () => {
  const { login } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    password: '',
    passwordCurrent: '',
    passwordConfirm: '',
  });

  const { password, passwordCurrent, passwordConfirm } = values;

  const handleChange = ({ target: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const validateForm = () => {
    const tempErrors = {};

    if (password === '') {
      tempErrors.password = 'Password field is required.';
    }

    if (passwordCurrent === '') {
      tempErrors.passwordCurrent = 'Current password field is required.';
    }

    if (passwordConfirm === '') {
      tempErrors.passwordConfirm = 'Confirm password field is required.';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userData = { password, passwordCurrent, passwordConfirm };
      const { headers } = await updateUserPassword(userData);
      login(headers['x-auth-token']);
      setValues({ password: '', passwordCurrent: '', passwordConfirm: '' });
      window.location.reload();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const tempErrors = { ...errors };
        tempErrors.passwordCurrent = ex.response.data.message;
        setErrors(tempErrors);
      } else if (ex.response && ex.response.status === 500) {
        const tempErrors = { ...errors };
        tempErrors.passwordConfirm = ex.response.data.message.slice(41);
        setErrors(tempErrors);
      }
    }
  };

  return (
    <div className='user-password'>
      <h2 className='text-left text-uppercase'>Password change</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <Input
          type='password'
          name='passwordCurrent'
          label='Current Password'
          placeholder='********'
          value={passwordCurrent}
          onChange={handleChange}
          error={errors.passwordCurrent}
        />
        <Input
          type='password'
          name='password'
          label='Password'
          placeholder='********'
          value={password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          type='password'
          name='passwordConfirm'
          label='Confirm Password'
          placeholder='********'
          value={passwordConfirm}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />
        <Button
          type='submit'
          text='Save password'
          size='btn-block'
          color='dark'
          icon={<FaArrowAltCircleRight style={iconStyling} />}
        />
      </form>
    </div>
  );
};

const iconStyling = {
  fontSize: '0.8rem',
};

export default UserPassword;
