// import { NavLink } from 'react-router-dom';
// import './Sidebar.css';
// import { FiLogOut, FiSearch, FiUsers } from 'react-icons/fi';
// import { MdOutlineGroup, MdOutlineCalendarToday, MdOutlineAccessTime } from 'react-icons/md';
// import { FaUserTie } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">LOGO</div>
//         <div className="search-bar">
//           <FiSearch />
//           <input type="text" placeholder="Search" />
//         </div>
//       </div>

//       <div className="sidebar-section">
//         <p className="section-title">Recruitment</p>
//         <NavLink to="/dashboard/candidates" activeclassname="active">
//           <FaUserTie /> Candidates
//         </NavLink>
//       </div>

//       <div className="sidebar-section">
//         <p className="section-title">Organization</p>
//         <NavLink to="/dashboard/employees"><MdOutlineGroup /> Employees</NavLink>
//         <NavLink to="/dashboard/attendance"><MdOutlineCalendarToday /> Attendance</NavLink>
//         <NavLink to="/dashboard/leaves"><MdOutlineAccessTime /> Leaves</NavLink>
//       </div>

//       <div className="sidebar-section bottom">
//         <p className="section-title">Others</p>
//         <NavLink to="/logout"><FiLogOut /> Logout</NavLink>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;

import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import { FiLogOut, FiSearch } from 'react-icons/fi';
import { MdOutlineGroup, MdOutlineCalendarToday, MdOutlineAccessTime } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';

const Sidebar = () => {
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
        <NavLink to="/logout"><FiLogOut /> Logout</NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

