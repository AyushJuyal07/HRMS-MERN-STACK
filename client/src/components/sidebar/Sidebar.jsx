import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { MdOutlineGroup, MdOutlineCalendarToday, MdOutlineAccessTime } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import Logout from '../logout/Logout';
import { useState } from 'react';

const Sidebar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

    const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setShowLogout(false);
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">LOGO</div>
        <div className="search-bar">
          <FiSearch />
          <input type="text" placeholder="Search" />
        </div>
      </div>

      <div className="sidebar-section">
        <p className="section-title">Recruitment</p>
        <NavLink to="/dashboard/candidates"> <FaUserTie /> Candidates </NavLink>
      </div>

      <div className="sidebar-section">
        <p className="section-title">Organization</p>
        <NavLink to="/dashboard/employees"><MdOutlineGroup /> Employees</NavLink>
        <NavLink to="/dashboard/attendance"><MdOutlineCalendarToday /> Attendance</NavLink>
        <NavLink to="/dashboard/leaves"><MdOutlineAccessTime /> Leaves</NavLink>
      </div>

      <div className="sidebar-section bottom">
        <p className="section-title">Others</p>
        <div className="sidebar-link-wrapper">
          <div className="sidebar-link" onClick={() => setShowLogout(true)}>
            <FiLogOut />
            <span>Logout</span>
          </div>
        </div>
      </div>
      {showLogout && (
        <Logout
          onCancel={() => setShowLogout(false)}
          onConfirm={handleLogoutConfirm}
        />
      )}
    </aside>
  );
};

export default Sidebar;





