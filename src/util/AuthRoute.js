import { Route, Redirect } from 'react-router-dom';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useGlobalAuthContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
