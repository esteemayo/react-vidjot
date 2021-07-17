import PropTypes from 'prop-types';

const About = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>
        This is a MERN application for jotting down ideas for future YouTube
        videos
      </p>
      <p>Version: 1.0.0</p>
    </div>
  );
};

About.defaultProps = {
  title: 'About',
};

About.propTypes = {
  title: PropTypes.string.isRequired,
};

export default About;
