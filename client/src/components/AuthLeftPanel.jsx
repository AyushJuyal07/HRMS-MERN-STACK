import React from 'react';
import img from '../img/login-page.png'

const AuthLeftPanel = () => {
  return (
    <div className="login-left">
      <img src={img} alt="Dashboard" />
      <p className="title">
        Manage your team with clarity and confidence
      </p>
      <p className="desc">
        Empower your HR operations with real-time insights, seamless workflows, and intuitive dashboards — all in one place...
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
