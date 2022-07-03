import { useEffect, useState } from 'react';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);

  const navigate = (path) => {
    return (window.location = path);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && navigate('/auth/login');
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <div className='redirect'>
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
