import React from 'react';
import { Link } from 'react-router-dom';
import AleaImage from '../../assets/Alea_img.png'; 
import NotFoundGif from '../../assets/404-Alea.gif'; 
import '../../styles/styles.less';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      
      <Link to="/users">
        <img src={AleaImage} alt="Alea Logo" className="not-found-logo" />
      </Link>

      
      <div className="not-found-image-container">
        <img src={NotFoundGif} alt="404 Not Found" className="not-found-gif" />
      </div>

      
      <div className="button-container">
        <Link to="/users" className="mui-button-primary button">
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
