import { Route, Redirect } from 'react-router-dom';

import { useGlobalContext } from '../context/GlobalState';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to='/auth/login' />
      }
    />
  );
};

export default ProtectedRoute;
