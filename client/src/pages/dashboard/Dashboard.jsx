import { useCallback, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import TopbarIcons from '../../components/topbarIcons/TopbarIcons';
import { toast } from 'react-toastify';
import { FiMenu, FiX } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const logoutUser = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    toast.info('You have been logged out');
    navigate('/login');
  }, [navigate]);

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
  }, [logoutUser]);

  const getPageTitle = () => {
    const path = location.pathname.split('/')[2];
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : '';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('sidebar-overlay')) {
      closeSidebar();
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={handleOverlayClick}
        />
      )}

      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-header-left">
            <button 
              className="hamburger-menu"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? <FiX /> : <FiMenu />}
            </button>
            <h2 className="dashboard-title">{getPageTitle()}</h2>
          </div>
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
