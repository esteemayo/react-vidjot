import { toast } from 'react-toastify';
import { useReducer, useContext, createContext } from 'react';

import * as actions from './IdeaTypes';
import IdeaReducer from './IdeaReducer';
import { deleteIdea } from 'services/ideaService';

const INITIAL_STATE = {
  ideas: [],
  loading: true,
  alert: {
    show: false,
    type: '',
    msg: '',
  },
};

const IdeaContext = createContext(INITIAL_STATE);

const IdeaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(IdeaReducer, INITIAL_STATE);

  const addIdea = (idea) => {
    dispatch({ type: actions.ADD_IDEA, payload: idea });
  };

  const editIdea = (idea) => {
    dispatch({
      type: actions.UPDATE_IDEA,
      payload: idea,
    });
  };

  const handleDelete = async (id) => {
    const originalIdeas = [...state.ideas];
    dispatch({
      type: actions.DELETE_IDEA,
      payload: id,
    });

    try {
      await deleteIdea(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This idea has already been deleted!');
      INITIAL_STATE.ideas = originalIdeas;
    }
  };

  const hideAlert = () => {
    dispatch({ type: actions.REMOVE_ALERT });
  };

  return (
    <IdeaContext.Provider
      value={{
        ...state,
        dispatch,
        addIdea,
        editIdea,
        hideAlert,
        handleDelete,
      }}
    >
      {children}
    </IdeaContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(IdeaContext);
};

export { IdeaProvider };
