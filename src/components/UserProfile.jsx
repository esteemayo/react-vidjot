import Moment from 'react-moment';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const UserProfile = () => {
  const { user } = useGlobalAuthContext();

  return (
    <div className='col-md-6 text-left'>
      <h2 className='text-uppercase'>User Profile</h2>
      <div className='thumbnail'>
        <img src={user.photo} alt='avatar' />
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
