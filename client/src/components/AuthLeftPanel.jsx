import React from 'react';
import img from '../img/login-page.png'

const AuthLeftPanel = () => {
  return (
    <div className="login-left">
      <img src={img} alt="Dashboard" />
      <p className="title">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      </p>
      <p className="desc">
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
      </p>
      <div className="dots">
        <div className="dot active"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default React.memo(AuthLeftPanel);
