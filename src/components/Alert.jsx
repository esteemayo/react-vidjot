import { useEffect } from 'react';

import { useGlobalContext } from 'context/ideas/IdeaContext';
import { useGlobalAuthContext } from 'context/auth/AuthContext';

const Alert = ({ msg, type }) => {
  const { ideas, hideAlert } = useGlobalContext();
  const { hideModal } = useGlobalAuthContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
      hideModal();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [ideas, hideAlert, hideModal]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
