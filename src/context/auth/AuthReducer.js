import * as actions from './AuthTypes';

const AuthReducer = (state, { payload, type }) => {
  if (type === actions.LOGIN_START) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (type === actions.LOGIN_SUCCESS) {
    return {
      ...state,
      user: payload,
      loading: false,
      modal: {
        show: true,
        type: 'success',
        msg: 'You have successfully logged in',
      },
    };
  }

  if (type === actions.LOGIN_FAILURE) {
    return {
      ...state,
      loading: false,
      user: null,
      error: payload.message,
    };
  }

  if (type === actions.LOGOUT) {
    return {
      ...state,
      user: null,
      modal: {
        show: true,
        type: 'success',
        msg: 'Logged you out',
      },
    };
  }

  if (type === actions.REMOVE_MODAL) {
    return {
      ...state,
      modal: {
        show: false,
      },
    };
  }

  throw new Error(`No matching action type → ${type}`);
};

export default AuthReducer;
