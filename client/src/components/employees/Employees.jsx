import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditEmpoyees from './EditEmployees';
import './Employees.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('employees/get', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmployees(response.data);
        setFilteredEmployees(response.data);

        const positionMap = {};
        response.data.forEach(e => {
          const raw = e.position || '';
          const normalized = raw.trim().toLowerCase();
          if (!positionMap[normalized]) {
            positionMap[normalized] = raw.trim();
          }
        });

        const uniquePositions = Object.values(positionMap);
        setPositions(uniquePositions);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(emp => {
      return positionFilter ? emp.position === positionFilter : true;
    });
    setFilteredEmployees(filtered);
  }, [positionFilter, employees]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`employees/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updated = employees.filter(e => e._id !== id);
      setEmployees(updated);
    } catch (err) {
      console.error('Error deleting employee:', err);
    }
  };

  const handleEditEmployees = async (updatedData, id) => {
    try {
      const token = localStorage.getItem('token');
      await api.patch(`employees/update/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setShowModal(false);
      const updated = employees.map(emp =>
        emp._id === id ? { ...emp, ...updatedData } : emp
      );
      setEmployees(updated);
    } catch (err) {
      console.error('Error updating employee:', err);
    }
  };

  return (
    <div className="candidates-page">
      <div className="candidates-header">
        <div className="filters">
          <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)}>
            <option value="">Position</option>
            {positions.map((pos, i) => (
              <option key={i}>{pos}</option>
            ))}
          </select>
        </div>

        <div className="right-tools">
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
          />
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
              <th>Department</th>
              <th>Date of Joining</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((e) => (
              <tr key={e._id}>
                <td>
                  <img className='profileImage'
                    src={e.profileUrl || 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740'}
                    alt="Profile"
                  />
                </td>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phoneNumber}</td>
                <td>{e.position}</td>
                <td>{e.department}</td>
                <td>{e.joiningDate}</td>
                <td className="action-cell">
                  <div className="action-wrapper">
                    <FiMoreVertical
                      className="action-icon"
                      onClick={() => setActiveAction(activeAction === e._id ? null : e._id)}
                    />
                    {activeAction === e._id && (
                      <div className="dropdown-actions">
                        <button
                          className="dropdown-button"
                          onClick={() => {
                            setCurrentEmployee(e);
                            setShowModal(true);
                          }}
                        >
                          <FiEdit2 /> Edit
                        </button>
                        <div className="dropdown-button" onClick={() => handleDelete(e._id)}>
                          <FiTrash2 /> Delete
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <EditEmpoyees
          onClose={() => setShowModal(false)}
          onSubmit={(data) => handleEditEmployees(data, currentEmployee._id)}
          initialData={currentEmployee}
        />
      )}
    </div>
  );
};

export default Employees;

