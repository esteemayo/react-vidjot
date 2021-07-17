import Moment from 'react-moment';

import { useGlobalContext } from '../context/GlobalState';

const UserProfile = () => {
  const { user } = useGlobalContext();

  return (
    <div className='col-md-6 text-left'>
      <h2 className='text-uppercase'>User Profile</h2>
      <div className='thumbnail'>
        <img src={user.gravatar} alt='gravatar' />
      </div>
      <p>Name: {user.name}</p>
      <p>
        Email: <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
      <p>
        Joined: <Moment format='MMMM YYYY'>{user.createdAt}</Moment>
      </p>
    </div>
  );
};

export default UserProfile;
