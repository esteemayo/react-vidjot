import { useEffect } from 'react';

import { useGlobalContext } from '../context/GlobalState';

const Alert = ({ msg, type }) => {
  const { ideas, hideAlert } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [ideas, hideAlert]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
