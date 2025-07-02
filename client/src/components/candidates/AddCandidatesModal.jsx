// AddCandidateModal.jsx
import './AddCandidateModal.css';
import { useState } from 'react';

const AddCandidateModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    resume: null,
    declaration: false,
  });

  const isFormValid =
    formData.name &&
    formData.email &&
    formData.phoneNumber &&
    formData.position &&
    formData.experience &&
    formData.resume &&
    formData.declaration;

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
    if (!isFormValid) return;

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
          <h3>Add New Candidate</h3>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="row">
            <input name="name" placeholder="Full Name*" value={formData.name} onChange={handleChange} />
            <input name="email" placeholder="Email Address*" value={formData.email} onChange={handleChange} type="email" />
          </div>
          <div className="row">
            <input name="phoneNumber" placeholder="Phone Number*" value={formData.phoneNumber} onChange={handleChange} />
            <input name="position" placeholder="Position*" value={formData.position} onChange={handleChange} />
          </div>
          <div className="row">
            <input name="experience" placeholder="Experience*" value={formData.experience} onChange={handleChange} />
            <label className="upload-label">
              Resume*
              <input type="file" onChange={handleFileChange} />
            </label>
          </div>
          <label className="checkbox-line">
            <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} />
            I hereby declare that the above information is true to the best of my knowledge and belief
          </label>
          <button type="submit" disabled={!isFormValid} className="submit-btn">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidateModal;
