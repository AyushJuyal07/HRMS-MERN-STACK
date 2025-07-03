import './EditEmployees.css';
import { useEffect, useState } from 'react';

const EditEmployees = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    joiningDate: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phoneNumber: initialData.phoneNumber || '',
        department: initialData.department || '',
        position: initialData.position || '',
        joiningDate: initialData.joiningDate || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send JSON, not FormData
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Employee Details</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <input name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email Address*" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="row">
            <input name="phoneNumber" placeholder="Phone Number*" value={formData.phoneNumber} onChange={handleChange} />
            <input name="department" placeholder="Department*" value={formData.department} onChange={handleChange} />
          </div>
          <div className="row">
            <input name="position" placeholder="Position*" value={formData.position} onChange={handleChange} />
            <input name="joiningDate" placeholder="Joining Date*" value={formData.joiningDate} onChange={handleChange} />
          </div>
          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmployees;

