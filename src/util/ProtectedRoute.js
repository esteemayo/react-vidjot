import { Route, Redirect } from 'react-router-dom';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalAuthContext();

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
