import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Home = ({ title }) => {
  return (
    <div className='jumbotron text-center'>
      <h1 className='display-3'>{title}</h1>
      <p className='lead'>Jot down ideas for your next YouTube videos</p>
      <Link to='/ideas/add' className='btn btn-dark btn-lg'>
        Add Video Idea
      </Link>
    </div>
  );
};

Home.defaultProps = {
  title: 'Welcome',
};

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;
