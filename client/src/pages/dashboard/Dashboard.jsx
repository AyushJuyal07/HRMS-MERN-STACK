// import Sidebar from '../../components/sidebar/Sidebar';
// import TopbarIcons from '../../components/topbarIcons/TopbarIcons';
// import './Dashboard.css';
// import { Outlet, useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   const location = useLocation();

//   const getPageTitle = () => {
//     const path = location.pathname.split('/')[2];
//     return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <Sidebar />
//       <div className="dashboard-main">
//         <div className="dashboard-header">
//           <h2 className="dashboard-title">{getPageTitle()}</h2>
//           <TopbarIcons />
//         </div>
//         <div className="dashboard-content">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// Dashboard.jsx
// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from '../../components/sidebar/Sidebar';
// import TopbarIcons from '../../components/topbarIcons/TopbarIcons';
// import './Dashboard.css';

// const Dashboard = () => {
//   const location = useLocation();

//   const getPageTitle = () => {
//     const path = location.pathname.split('/')[2];
//     return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <Sidebar />
//       <div className="dashboard-main">
//         <div className="dashboard-header">
//           <h2 className="dashboard-title">{getPageTitle()}</h2>
//           <TopbarIcons />
//         </div>
//         <div className="dashboard-content">
//           <Outlet /> {/* This is the key line */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import TopbarIcons from '../../components/topbarIcons/TopbarIcons';
import { toast } from 'react-toastify';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
  };

  useEffect(() => {
    const loginTime = localStorage.getItem('loginTime');
    if (loginTime) {
      const loginTimestamp = new Date(loginTime).getTime();
      const now = Date.now();
      const twoHours = 2 * 60 * 60 * 1000;
      const remainingTime = twoHours - (now - loginTimestamp);

      if (remainingTime <= 0) {
        logoutUser();
      } else {
        const timeoutId = setTimeout(() => {
          logoutUser();
        }, remainingTime);

        return () => clearTimeout(timeoutId);
      }
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    toast.info('You have been logged out');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h2 className="dashboard-title">{getPageTitle()}</h2>
          <TopbarIcons />
        </div>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
