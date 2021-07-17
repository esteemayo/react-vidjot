import UserPassword from './UserPassword';
import Deactivate from './Deactivate';
import UserData from './UserData';

const AccountSettings = () => {
  return (
    <div className='col-md-6'>
      <UserData />
      <UserPassword />
      <Deactivate />
    </div>
  );
};

export default AccountSettings;
