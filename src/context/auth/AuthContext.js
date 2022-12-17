import jwtDecode from 'jwt-decode';
import { createContext, useContext, useEffect, useReducer } from 'react';

import * as actions from './AuthTypes';
import AuthReducer from './AuthReducer';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from 'util/index';

const user = getFromStorage();
const token = localStorage.getItem(tokenKey);

const INITIAL_STATE = {
  user: user ?? null,
  loading: false,
  error: null,
  modal: {
    show: false,
    type: '',
    msg: '',
  },
};

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    removeFromStorage();
  } else {
    INITIAL_STATE.user = decodedToken;
  }
}

const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const loginStart = () => {
    dispatch({
      type: actions.LOGIN_START,
    });
  };

  const loginSuccess = (userData) => {
    dispatch({
      type: actions.LOGIN_SUCCESS,
      payload: userData,
    });
  };

  const loginFailure = (error) => {
    dispatch({
      type: actions.LOGIN_FAILURE,
      payload: error,
    });
  };

  const logout = () => {
    removeFromStorage(tokenKey);
    dispatch({
      type: actions.LOGOUT,
    });
  };

  const hideModal = () => {
    dispatch({
      type: actions.REMOVE_MODAL,
    });
  };

  useEffect(() => {
    setToStorage(tokenKey, state.user);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{
      ...state,
      loginFailure,
      loginStart,
      loginSuccess,
      logout,
      hideModal,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider };
