import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import api from '../../services/api';
import './LeaveTable.css'

const LeaveTable = ({ leaves, searchTerm, statusFilter, onStatusChange }) => {
  const [updatingId, setUpdatingId] = useState(null);

  const filtered = leaves.filter((leave) => {
    const nameMatch = leave.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = statusFilter ? leave.status === statusFilter : true;
    return nameMatch && statusMatch;
  });

  const handleDownload = (url) => {
    if (!url) return;
    window.open(`http://localhost:5000/${url}`, '_blank');
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem('token');
      await api.patch(`leaves/update/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      onStatusChange();
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="leave-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Document</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((leave) => (
            <tr key={leave._id}>
              <td>{leave.employee?.name}</td>
              <td>{leave.date?.split('T')[0]}</td>
              <td>{leave.reason}</td>
              <td>
                {leave.document && (
                  <button className="doc-download" onClick={() => handleDownload(leave.document)}>
                    <FiDownload /> Download
                  </button>
                )}
              </td>
              <td>
                <select
                  value={leave.status}
                  onChange={(e) => handleStatusUpdate(leave._id, e.target.value)}
                  disabled={updatingId === leave._id}
                  className={`status-select ${leave.status.toLowerCase()}`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <div className="empty-state">No leaves found.</div>}
    </div>
  );
};

export default LeaveTable;
