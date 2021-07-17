import { useEffect, useReducer, useContext, createContext } from 'react';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

import { deleteIdea, getIdeas } from '../services/ideaService';
import AppReducer from './AppReducer';

const initialStates = {
  user: null,
  ideas: [],
  loading: true,
  alert: {
    show: false,
    type: '',
    msg: '',
  },
};

if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialStates.user = decodedToken;
  }
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialStates);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    const { data: ideas } = await getIdeas();
    dispatch({ type: 'DISPLAY_IDEAS', payload: ideas });
    dispatch({ type: 'LOADING' });
  };

  const addIdea = (idea) => {
    dispatch({ type: 'ADD_IDEA', payload: idea });
  };

  const login = (userData) => {
    localStorage.setItem('token', userData);
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const handleDelete = async (id) => {
    const originalIdeas = [...state.ideas];
    dispatch({
      type: 'DELETE_IDEA',
      payload: id,
    });

    try {
      await deleteIdea(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This idea has already been deleted!');
      initialStates.ideas = originalIdeas;
    }
  };

  const hideAlert = () => {
    dispatch({ type: 'REMOVE_ALERT' });
  };

  return (
    <AppContext.Provider
      value={{ ...state, login, logout, addIdea, hideAlert, handleDelete }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
