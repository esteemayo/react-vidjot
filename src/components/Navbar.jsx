import { Link } from 'react-router-dom';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaHome, FaRegUser } from 'react-icons/fa';

import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useGlobalAuthContext();

  return (
    <div className='container-fluid'>
      <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-3'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            VidJot
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  <FaHome style={iconStyling} />
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
            </ul>
            <ul className='navbar-nav ml-auto'>
              {user && (
                <>
                  <li className='nav-item'>
                    <Link to='/ideas/add' className='nav-link'>
                      Add Idea
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/ideas' className='nav-link'>
                      Ideas
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link className='nav-link' to='/account'>
                      <FaRegUser style={iconStyling} />
                    </Link>
                  </li>
                  <Link to='/auth/login' className='nav-link' onClick={logout}>
                    <li className='nav-item'>
                      <IoLogOutOutline
                        style={{ fontSize: '1.5rem', color: '#fff' }}
                      />
                    </li>
                  </Link>
                </>
              )}
              {!user && (
                <>
                  <li className='nav-item'>
                    <Link to='/auth/login' className='nav-link'>
                      Login
                    </Link>
                  </li>
                  <li className='nav-item'>
                    <Link to='/users/register' className='nav-link'>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

const iconStyling = {
  fontSize: '1.3rem',
  color: '#fff',
};

export default Navbar;
