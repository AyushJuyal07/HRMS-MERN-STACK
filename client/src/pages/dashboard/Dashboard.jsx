import Sidebar from '../../components/sidebar/Sidebar';
import './Dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
