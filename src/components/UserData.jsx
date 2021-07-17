import { useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';

import { useGlobalContext } from '../context/GlobalState';
import { updateUserData } from '../services/userService';
import Button from '../components/Button';
import Input from '../components/Input';

const UserData = () => {
  const { user, login } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: '',
    email: '',
    username: '',
  });

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
        <Input
          name='name'
          label='Name'
          placeholder={user.name}
          value={name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          type='email'
          name='email'
          label='Email'
          placeholder={user.email}
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          name='username'
          label='Username'
          placeholder={user.username}
          value={username}
          onChange={handleChange}
          error={errors.username}
        />
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
