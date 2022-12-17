import * as actions from './IdeaTypes';

const IdeaReducer = (state, { payload, type }) => {
  if (type === actions.DISPLAY_IDEAS) {
    return {
      ...state,
      ideas: payload,
    };
  }

  if (type === actions.LOADING) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.ADD_IDEA) {
    return {
      ...state,
      ideas: [payload, ...state.ideas],
      alert: {
        show: true,
        type: 'success',
        msg: 'Video idea added successfully',
      },
    };
  }

  if (type === actions.UPDATE_IDEA) {
    return {
      ...state,
      ideas: state.ideas.map((idea) =>
        idea._id === payload.id ? payload : idea
      ),
      alert: {
        show: true,
        type: 'success',
        msg: 'Video idea updated successfully',
      },
    };
  }

  if (type === actions.DELETE_IDEA) {
    return {
      ...state,
      ideas: state.ideas.filter((idea) => idea.id !== payload),
      alert: {
        show: true,
        type: 'danger',
        msg: 'Video idea deleted successfully',
      },
    };
  }

  if (type === actions.REMOVE_ALERT) {
    return {
      ...state,
      alert: {
        show: false,
      },
    };
  }

  throw new Error(`No matching action type → ${type}`);
};

export default IdeaReducer;
