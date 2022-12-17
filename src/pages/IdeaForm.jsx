import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

import Input from 'components/Input';
import Button from 'components/Button';
import TextArea from 'components/TextArea';
import { createIdea } from 'services/ideaService';
import { useGlobalContext } from 'context/ideas/IdeaContext';

const initialState = {
  title: '',
  details: '',
};

const IdeaForm = () => {
  const history = useHistory();
  const { addIdea } = useGlobalContext();

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialState);

  const { title, details } = values;

  const handleChange = ({ target: input }) => {
    const { name, value } = input;
    setValues((prev) => ({ ...prev, [name]: value }));
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

    if (!validateForm()) return;
    setErrors({});

    await handleIdea();
    await history.push('/ideas');
  };

  const handleIdea = async () => {
    const { data: idea } = await createIdea({ ...values });
    addIdea(idea);
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
