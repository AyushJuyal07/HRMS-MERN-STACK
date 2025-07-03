import { useEffect, useState } from 'react';
import './Leaves.css';
import api from '../../services/api';
import LeaveTable from './LeaveTable';
import LeaveCalendar from './LeaveCalender';
import LeaveModal from './LeaveModal';
import { toast } from 'react-toastify';


const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);


const fetchLeaves = async () => {
  const token = localStorage.getItem('token');
  const res = await api.get('leaves/get', {
    headers: { Authorization: `Bearer ${token}` },
  });
  setLeaves(res.data);
};


const handleStatusChange = async () => {
  await fetchLeaves(); // Refresh after status update
};


  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('employees/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const presentEmployees = res.data.filter(emp => {
        const latest = emp.attendanceStatus?.[emp.attendanceStatus.length - 1];
        return latest?.status === 'Present';
      });
      setEmployees(presentEmployees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

const handleAddLeave = async (formData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('leaves/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const newLeave = response.data.leave;

    // Append the new leave to the current state immediately
    setLeaves(prev => [...prev, newLeave]);

    toast.success('Leave created successfully');
    setShowModal(false);
  } catch (err) {
    console.error('Error creating leave:', err);
    toast.error('Failed to create leave');
  }
};


  return (
    <div className="leaves-page">
      <div className="leaves-header">
        <div className="filters">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>Apply Leave</button>
      </div>

      <div className="leaves-content">
        <div className="leaves-table-wrapper">
          <LeaveTable
            leaves={leaves}
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            onStatusChange={handleStatusChange}
          />
        </div>

        <div className="leaves-calendar-wrapper">
          <LeaveCalendar leaves={leaves} />
        </div>
      </div>

      {showModal && (
        <LeaveModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddLeave}
          employees={employees}
        />

      )}
    </div>
  );
};

export default Leaves;
