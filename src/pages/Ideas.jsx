import { useCallback, useEffect } from 'react';

import Idea from 'components/Idea';
import Spinner from 'components/Spinner';
import { getIdeas } from 'services/ideaService';
import { useGlobalContext } from 'context/ideas/IdeaContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';
import { DISPLAY_IDEAS, LOADING } from 'context/ideas/IdeaTypes';

const Ideas = () => {
  const { user } = useGlobalAuthContext();
  const { ideas, loading, dispatch } = useGlobalContext();

  const fetchIdeas = useCallback(async () => {
    const { data: ideas } = await getIdeas();
    dispatch({ type: DISPLAY_IDEAS, payload: ideas });
    dispatch({ type: LOADING });
  }, [dispatch]);

  useEffect(() => {
    user && fetchIdeas();
  }, [fetchIdeas, user]);

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className='error-container'>
        <p>No video ideas listed</p>
      </div>
    );
  }

  return (
    <div className='card card-body mb-2 idea-card'>
      {ideas &&
        ideas.map((idea) => {
          return <Idea key={idea._id} {...idea} />;
        })}
    </div>
  );
};

export default Ideas;
