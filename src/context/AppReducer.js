const AppReducer = (state, action) => {
  if (action.type === 'DISPLAY_IDEAS') {
    const newIdea = action.payload;

    return {
      ...state,
      ideas: newIdea,
    };
  }

  if (action.type === 'LOADING') {
    return {
      ...state,
      loading: false,
    };
  }

  if (action.type === 'ADD_IDEA') {
    const newIdea = [action.payload, ...state.ideas];

    return {
      ...state,
      ideas: newIdea,
      alert: {
        show: true,
        type: 'success',
        msg: 'Video idea added successfully.',
      },
    };
  }

  if (action.type === 'DELETE_IDEA') {
    const updIdeas = state.ideas.filter((idea) => idea.id !== action.payload);

    return {
      ...state,
      ideas: updIdeas,
      alert: {
        show: true,
        type: 'danger',
        msg: 'Video idea deleted successfully.',
      },
    };
  }

  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload,
      alert: {
        show: true,
        type: 'success',
        msg: 'You have successfully logged in.',
      },
    };
  }

  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
      alert: {
        show: true,
        type: 'success',
        msg: 'Logged you out.',
      },
    };
  }

  if (action.type === 'REMOVE_ALERT') {
    return {
      ...state,
      alert: {
        show: false,
      },
    };
  }

  throw new Error('No matching action type');
};

export default AppReducer;
