import AccountSettings from '../components/AccountSettings';
import UserProfile from '../components/UserProfile';

const Account = () => {
  return (
    <div className='row'>
      <UserProfile />
      <AccountSettings />
    </div>
  );
};

export default Account;
