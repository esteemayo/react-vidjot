import { useState, useEffect, useCallback } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { getIdea, updateIdea } from '../services/ideaService';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Input from '../components/Input';

const EditIdea = () => {
  const { id } = useParams();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: '',
    details: '',
  });

  const fetchIdea = useCallback(async () => {
    const { data } = await getIdea(id);
    setValues(data);
  }, [id]);

  useEffect(() => {
    fetchIdea();
  }, [fetchIdea]);

  const { title, details } = values;

  const handleChange = ({ target: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const validateForm = () => {
    const tempErrors = {};

    if (title.trim() === '') {
      tempErrors.title = 'Title field is required.';
    }

    if (details.trim() === '') {
      tempErrors.details = 'Details field is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm) return;

    const updObj = { title, details };
    await updateIdea(id, updObj);
    window.location.reload();
  };

  return (
    <div className='card card-body'>
      <h3 className='text-center'>Edit Video Idea</h3>
      <form onSubmit={handleSubmit}>
        <Input
          name='title'
          label='Title'
          autoFocus
          value={title}
          error={errors.title}
          onChange={handleChange}
        />
        <TextArea
          name='details'
          label='Details'
          value={details}
          error={errors.details}
          onChange={handleChange}
        />
        <Button
          type='submit'
          text='Update'
          size='btn-block'
          color='dark'
          icon={<FaArrowRight style={iconStyling} />}
        />
      </form>
    </div>
  );
};

const iconStyling = {
  fontSize: '0.8rem',
};

export default EditIdea;
