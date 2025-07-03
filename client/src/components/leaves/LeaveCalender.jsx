import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './LeaveCalender.css';

const LeaveCalendar = ({ leaves }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [approvedLeaves, setApprovedLeaves] = useState([]);
  const [leaveCountByDate, setLeaveCountByDate] = useState({});

  useEffect(() => {
    if (leaves) {
      const filtered = leaves.filter(
        leave =>
          leave.status === 'Approved' &&
          leave.date &&
          !isNaN(new Date(leave.date))
      );
      setApprovedLeaves(filtered);

      const countMap = {};
      filtered.forEach(leave => {
        const dateObj = new Date(leave.date);
        if (!isNaN(dateObj)) {
          const dateStr = dateObj.toDateString(); // Normalize
          countMap[dateStr] = (countMap[dateStr] || 0) + 1;
        }
      });

      setLeaveCountByDate(countMap);
    }
  }, [leaves]);

  const getTileContent = ({ date }) => {
    const dateStr = date.toDateString();
    const count = leaveCountByDate[dateStr];

    return (
      <>
        {count > 0 && (
          <>
            <div className="calendar-dot" />
            <div className="calendar-count">{count}</div>
          </>
        )}
      </>
    );
  };

  const leavesForSelectedDate = approvedLeaves.filter(leave => {
    if (!leave.date || isNaN(new Date(leave.date))) return false;
    const leaveDate = new Date(leave.date).toDateString();
    const selected = selectedDate.toDateString();
    return leaveDate === selected;
  });

  return (
    <div className="leave-calendar-container">
      <h3 className="calendar-title">Leave Calendar</h3>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={getTileContent}
      />
      <div className="approved-list">
        <h4>Approved Leaves</h4>
        {leavesForSelectedDate.length === 0 ? (
          <p className="no-approvals">No approved leaves</p>
        ) : (
          leavesForSelectedDate.map(leave => (
            <div key={leave._id} className="approved-item">
              <img
                src={
                  leave.employee?.profileUrl ||
                  'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740'
                }
                alt="profile"
              />
              <div>
                <p className="name">{leave.employee?.name}</p>
              </div>
              <span className="leave-date">
                {new Date(leave.date).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeaveCalendar;




