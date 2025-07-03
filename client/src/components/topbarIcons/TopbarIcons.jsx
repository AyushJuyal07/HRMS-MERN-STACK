import { useState, useRef, useEffect } from 'react';
import { FiMail, FiBell } from 'react-icons/fi';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './TopbarIcons.css';

const TopbarIcons = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="topbar-icons">
      <FiMail className="icon" />
      <FiBell className="icon" />

      <div className="profile-wrapper" ref={menuRef}>
        <img
          className="icon profile-icon"
          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
          alt="Profile"
          onClick={() => setOpen(prev => !prev)}
        />
        {open ? (
          <FaChevronUp className="chevron" onClick={() => setOpen(false)} />
        ) : (
          <FaChevronDown className="chevron" onClick={() => setOpen(true)} />
        )}

        {open && (
          <div className="dropdown-menu">
            <button>Edit Profile</button>
            <button>Change Password</button>
            <button>Manage Notification</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopbarIcons;
