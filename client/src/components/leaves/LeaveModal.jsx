import './LeaveModal.css';
import { useState } from 'react';

const LeaveModal = ({ onClose, onSubmit, employees }) => {
  const presentEmployees = employees.filter(emp => {
    const latestStatus = emp.attendanceStatus?.[emp.attendanceStatus.length - 1];
    return latestStatus?.status === 'Present';
  });

  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    reason: '',
    status: 'Pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Apply for Leave</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {presentEmployees.map(emp => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              type="text"
              name="reason"
              placeholder="Reason*"
              value={formData.reason}
              onChange={handleChange}
              required
            />
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default LeaveModal;
