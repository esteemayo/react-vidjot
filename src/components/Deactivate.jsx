import { FaCogs } from 'react-icons/fa';

import { deactivateAcc } from '../services/userService';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

import Button from './Button';

const Deactivate = () => {
  const { logout } = useGlobalAuthContext();

  const deleteMe = async () => {
    try {
      await deactivateAcc();
      logout();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='deactivate'>
      <h2 className='text-left text-uppercase'>Deactive your account</h2>
      <hr />
      <p>
        I would like to hereby formally request the removal of all my personal
        and private details from your company database as soon as possible.
      </p>
      <p>
        Note that you cannot re-activate an account that had already been
        deactivated again.
      </p>
      <Button
        text='Deactivate'
        size='btn-block'
        color='danger'
        onClick={deleteMe}
        icon={<FaCogs style={iconStyling} />}
      />
    </div>
  );
};

const iconStyling = {
  fontSize: '0.8rem',
};

export default Deactivate;
