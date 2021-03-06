import { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import Input from 'components/Input';
import Button from 'components/Button';
import { userDataInputs } from 'formData';
import { updateUserData } from 'services/userService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const initialState = {
  name: '',
  email: '',
  username: '',
};

const UserData = () => {
  const { user, login } = useGlobalAuthContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const { name, email, username } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues({ ...values, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (name.trim() === '') {
      errors.name = 'Name field is required.';
    }

    if (email.trim() === '') {
      errors.email = 'Email field is required.';
    }

    if (username.trim() === '') {
      errors.username = 'Username field is required.';
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

    try {
      const filterBody = { name, email, username };
      const { headers } = await updateUserData(filterBody);
      login(headers['x-auth-token']);
      setValues({ name: '', email: '', username: '' });
      window.location.reload();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const tempErrors = { ...errors };
        tempErrors.name = ex.response.data.message;
        setErrors(tempErrors);
      }
    }
  };

  return (
    <div>
      <h2 className='text-left text-uppercase'>Your account settings</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        {userDataInputs.map((input) => {
          const { id, name, type, label } = input;
          return (
            <Input
              key={id}
              type={type}
              name={name}
              label={label}
              placeholder={user[name]}
              value={values[name]}
              onChange={handleChange}
              error={errors[name]}
            />
          );
        })}
        <Button
          type='submit'
          text='Save settings'
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

export default UserData;
