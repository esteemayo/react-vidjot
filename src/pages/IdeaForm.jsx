import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { useGlobalContext } from '../context/GlobalState';
import { createIdea } from '../services/ideaService';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Input from '../components/Input';

const IdeaForm = ({ history }) => {
  const { addIdea } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    title: '',
    details: '',
  });

  const { title, details } = values;

  const handleChange = ({ target: input }) => {
    setValues({ ...values, [input.name]: input.value });
  };

  const validateForm = () => {
    const errors = {};

    if (title.trim() === '') {
      errors.title = 'Please add a title.';
    }

    if (details.trim() === '') {
      errors.details = 'Please add some details.';
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

    const { data: idea } = await createIdea(values);
    addIdea(idea);
    history.push('/ideas');
  };

  return (
    <div className='card card-body'>
      <h3 className='text-center'>Video Idea</h3>
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
          text='Submit'
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

export default IdeaForm;
