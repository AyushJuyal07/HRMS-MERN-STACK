// AddCandidateModal.jsx
import './EditEmployess.css';
import { useState } from 'react';

const EditEmpoyees = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    joiningDate: null,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== 'declaration') data.append(key, val);
    });

    onSubmit(data);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Edit Emplyee Details</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <input name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email Address*" value={formData.email} onChange={handleChange} type="email" />
          </div>
          <div className="row">
            <input name="phoneNumber" placeholder="Phone Number*" value={formData.phoneNumber} onChange={handleChange} />
            <input name="department" placeholder="Department*" value={formData.department} onChange={handleChange} />
          </div>
          <div className="row">
            <input name="position" placeholder="Position*" value={formData.position} onChange={handleChange} />
            <input name="Date of Joining" placeholder="Date of Joining*" value={formData.joiningDate} onChange={handleChange} />

          </div>

          <button type="submit" className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditEmpoyees;
