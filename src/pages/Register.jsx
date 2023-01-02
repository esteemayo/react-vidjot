import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import app from '../firebase';
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
  const { user, error, loading, loginFailure, loginStart, loginSuccess }
    = useGlobalAuthContext();

  const [file, setFile] = useState('');
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    if (!validateForm()) return;
    setErrors({});

    if (!file) {
      await handleRegister();
    } else {
      await handleUpload();
    }

    user && await window.location.replace('/ideas');
  };

  const handleRegister = async () => {
    loginStart();
    try {
      const { data } = await register({ ...values });
      loginSuccess(data);
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
          console.log('File available at', downloadURL);
          const newUser = {
            ...values,
            photo: downloadURL,
          };

          const { data } = await register({ ...newUser });
          loginSuccess(data);
        });
      }
    );
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

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

          <Input
            id='file'
            type='file'
            label='Photo'
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            color='dark'
            type='submit'
            text='Register'
            size='btn-block'
            disabled={loading}
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
