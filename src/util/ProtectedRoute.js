import { Route } from 'react-router-dom';

import LoadingToRedirect from './LoadingToRedirect';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <LoadingToRedirect />
      }
    />
  );
};

export default ProtectedRoute;
