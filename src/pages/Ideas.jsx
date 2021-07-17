import { useGlobalContext } from '../context/GlobalState';
import Spinner from '../components/Spinner';
import Idea from '../components/Idea';

const Ideas = () => {
  const { ideas, loading } = useGlobalContext();

  if (loading) {
    return (
      <main>
        <Spinner />
      </main>
    );
  }

  if (ideas.length === 0) {
    return <p>No video ideas listed</p>;
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
