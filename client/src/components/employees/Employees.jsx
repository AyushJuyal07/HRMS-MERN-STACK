import { useEffect, useState } from 'react';
import api from '../../services/api';
import { FiMoreVertical, FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditEmpoyees from './EditEmployess';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [positionFilter, setPositionFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeAction, setActiveAction] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleEditEmpoyees = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('candidates/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setShowModal(false);
      const updated = await api.get('candidates/get', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(updated.data);
    } catch (err) {
      console.error('Error adding candidate:', err);
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
              <th>Sr no.</th>
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
            {filteredEmployees.map((e, idx) => (
              <tr key={e._id}>
                <td>{String(idx + 1).padStart(2, '0')}</td>
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
                        {/* <div ><FiEdit2 /> Edit</div> */}
                        <button onClick={() => setShowModal(true)}>
                          <FiEdit2 />edit
                        </button>
                        <div onClick={() => handleDelete(e._id)}><FiTrash2 /> Delete</div>
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
          onSubmit={handleEditEmpoyees}
        />
      )}
    </div>
  );
};

export default Employees;
