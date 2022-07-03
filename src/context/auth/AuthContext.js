import jwtDecode from 'jwt-decode';
import { createContext, useContext, useReducer } from 'react';

import * as actions from './AuthTypes';
import AuthReducer from './AuthReducer';

const INITIAL_STATE = {
  user: null,
  modal: {
    show: false,
    type: '',
    msg: '',
  },
};

const tokenKey = 'token';
const token = localStorage.getItem(tokenKey);

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem(tokenKey);
  } else {
    INITIAL_STATE.user = decodedToken;
  }
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const login = (userData) => {
    localStorage.setItem(tokenKey, userData);
    dispatch({ type: actions.LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    dispatch({ type: actions.LOGOUT });
  };

  const hideModal = () => {
    dispatch({ type: actions.REMOVE_MODAL });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, hideModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
