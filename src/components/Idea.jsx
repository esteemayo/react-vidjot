import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { FaPen, FaTrash } from 'react-icons/fa';

import Button from 'components/Button';
import { useGlobalContext } from 'context/ideas/IdeaContext';

const Idea = ({ id, title, author, details, createdAt }) => {
  const { handleDelete: onDelete } = useGlobalContext();

  return (
    <>
      <h4 className='text-uppercase'>{title}</h4>
      <p>{details}</p>
      <p>By {author}</p>
      <p>
        <Moment format='YYYY/MM/DD HH:mm'>{createdAt}</Moment>
      </p>
      <Link
        to={`/ideas/update/${id}`}
        className='btn btn-dark btn-block text-uppercase mb-2'
      >
        Update <FaPen style={iconStyling} />
      </Link>
      <Button
        text='Delete'
        color='danger'
        icon={<FaTrash style={iconStyling} />}
        onClick={() => onDelete(id)}
      />
      <div className='space'></div>
    </>
  );
};

const iconStyling = {
  fontSize: '0.8rem',
};

export default Idea;
