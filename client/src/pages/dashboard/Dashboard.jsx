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
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import TopbarIcons from '../../components/topbarIcons/TopbarIcons';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/')[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
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
          <Outlet /> {/* This is the key line */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
