import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
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
  const { user, error, loading, loginFailure, loginStart, loginSuccess }
    = useGlobalAuthContext();

  const [file, setFile] = useState('');
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const { name, email, username } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    if (file) {
      await handleUpload();
    } else {
      await handleUpdateUserData();
    }
  };

  const handleUpdateUserData = async () => {
    loginStart();
    try {
      const filterBody = {
        name,
        email,
        username,
      };

      const { data } = await updateUserData({ ...filterBody });
      loginSuccess(data);
      // loginSuccess(headers['x-auth-token']);

      setValues(initialState);
      window.location.reload();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const tempErrors = { ...errors };
        tempErrors.name = ex.response.data.message;
        setErrors(tempErrors);
      }
      loginFailure(ex);
    }
  };

  const handleUpload = async () => {
    const fileName = `${new Date().getTime()}-${file.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;

          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const filterBody = {
            ...values,
            photo: downloadURL,
          };

          const { data } = await updateUserData({ ...filterBody });
          loginSuccess(data);

          setValues(initialState);
          window.location.reload();
        });
      }
    );
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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
        <Input
          id='file'
          type='file'
          label='Photo'
          onChange={(e) => setFile(e.target.value)}
        />
        <Button
          type='submit'
          text='Save settings'
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

export default UserData;
