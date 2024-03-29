import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Input from './Input';
import Button from './Button';
import { updatePasswordInputs } from 'formData';
import { updateUserPassword } from 'services/authService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const initialState = {
  password: '',
  passwordCurrent: '',
  passwordConfirm: '',
};

const UserPassword = () => {
  const { error, loading, loginFailure, loginStart, loginSuccess }
    = useGlobalAuthContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const { password, passwordCurrent, passwordConfirm } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    if (password !== passwordConfirm) {
      tempErrors.password = 'Passwords do not match.';
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
    await handleUpdateUserPassword();
  };

  const handleUpdateUserPassword = async () => {
    loginStart();

    try {
      const userData = {
        password,
        passwordCurrent,
        passwordConfirm,
      };

      const { data } = await updateUserPassword(userData);
      loginSuccess(data);

      setValues(initialState);
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

      loginFailure(ex);
    }
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div className='user-password'>
      <h2 className='text-left text-uppercase'>Password change</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {updatePasswordInputs.map((input) => {
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
          type='submit'
          text='Save password'
          size='btn-block'
          color='dark'
          disabled={loading}
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
