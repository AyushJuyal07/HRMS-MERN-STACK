import './TopbarIcons.css';
import { FiMail, FiBell } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const TopbarIcons = () => {
  return (
    <div className="topbar-icons">
      <FiMail className="icon" />
      <FiBell className="icon" />
      <FaUserCircle className="icon profile-icon" />
    </div>
  );
};

export default TopbarIcons;
