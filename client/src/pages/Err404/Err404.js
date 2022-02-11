import React from 'react';
import './Err404.scss';
import img from '../../assets/images/not-found.png';

function Err404() {
  return (
    <div className="container">
      <h1>
        <b>Something wrong :(</b>
      </h1>
      <a href="/">Return to home page</a>
      <img src={img} alt="404 Error" className="img" />
    </div>
  );
}

export default Err404;
