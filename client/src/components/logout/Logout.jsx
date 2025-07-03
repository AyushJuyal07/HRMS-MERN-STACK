import './Logout.css';

const Logout = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-modal">
        <div className="logout-header">Log Out</div>
        <div className="logout-body">Are you sure you want to log out?</div>
        <div className="logout-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button className="logout-btn" onClick={onConfirm}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
