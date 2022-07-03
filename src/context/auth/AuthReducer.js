import * as actions from './AuthTypes';

const AuthReducer = (state, { payload, type }) => {
  if (type === actions.LOGIN) {
    return {
      ...state,
      user: payload,
      modal: {
        show: true,
        type: 'success',
        msg: 'You have successfully logged in.',
      },
    };
  }

  if (type === actions.LOGOUT) {
    return {
      ...state,
      user: null,
      modal: {
        show: true,
        type: 'success',
        msg: 'Logged you out.',
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
