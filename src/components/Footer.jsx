import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <hr />
      <div className='text-center'>
        <p>
          Copyright &copy; {year}. All rights reserved. Design by Emmanuel
          Adebayo&trade;
        </p>
        <FaReact style={footerStyle} /> <FaNodeJs style={footerStyle} />{' '}
        <FaDatabase style={footerStyle} />
      </div>
      <hr />
    </footer>
  );
};

const footerStyle = {
  fontSize: '1.5rem',
  color: '#15847b',
};

export default Footer;
