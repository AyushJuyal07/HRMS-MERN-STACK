import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiMoreVertical } from 'react-icons/fi';
import { toast } from 'react-toastify';
import './Attendance.css';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceMap, setAttendanceMap] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('employees/get', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setEmployees(response.data);
        setFilteredEmployees(response.data);

        const map = {};
        response.data.forEach(emp => {
          const latestStatus = emp.attendanceStatus?.length
            ? emp.attendanceStatus[emp.attendanceStatus.length - 1].status
            : 'Present';
          map[emp._id] = latestStatus;
        });
        setAttendanceMap(map);

      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(emp => {
      const latestStatus = getTodayStatus(emp);
      const matchesStatus = statusFilter ? latestStatus === statusFilter : true;
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    setFilteredEmployees(filtered);
  }, [statusFilter, searchTerm, employees]);

  const getTodayStatus = (emp) => {
    const today = new Date().toISOString().split('T')[0];
    const entry = emp.attendanceStatus.find(
      a => new Date(a.date).toISOString().split('T')[0] === today
    );
    return entry ? entry.status : '--';
  };

  const handleStatusChange = (id, status) => {
    setAttendanceMap(prev => ({ ...prev, [id]: status }));
  };

  const markTodayAttendance = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post('employees/mark-today-attendance', attendanceMap, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err);
      toast.error('Failed to mark attendance');
    }
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="right-tools">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="add-btn" onClick={markTodayAttendance}>
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="candidates-table">
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Employee Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Tasks</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  <img
                    className='profileImage'
                    src={emp.profileUrl || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740'}
                    alt="Profile"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phoneNumber}</td>
                <td>{emp.position}</td>
                <td>{emp.task || '—'}</td>
                <td>
                  <select
              value={attendanceMap[emp._id]}
              onChange={(e) => handleStatusChange(emp._id, e.target.value)}
              className={`status-select ${attendanceMap[emp._id].toLowerCase()}`}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

                </td>
                <td className="action-cell">
                  <FiMoreVertical className="action-icon" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
