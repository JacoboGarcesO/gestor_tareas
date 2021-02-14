import React from 'react';
import '../styles/styles.css';
import {Link} from 'react-router-dom';

const ContentHome=()=>{
    return(
        <div className="content_principal">
          <div className="content_home_tittle pb-4">
            <h1 className="text-center text-white letter_tittle">Progressive Tasks</h1>
          </div>
          <div className="button_content_home text-center">
              <Link to="/login">
                <button type="button" className="btn btn-secondary btn-lg letter">Sign in</button>
              </Link>
          </div>
          <div className="button_content_home text-center content_home_1">
              <Link to='/singup'>
                <button type="button" className="btn btn-secondary btn-lg letter">Sign up</button>
              </Link>
          </div>
        </div>
    );
};

export default ContentHome;