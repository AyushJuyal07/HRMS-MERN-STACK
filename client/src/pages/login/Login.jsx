import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './Login.css';
import AuthLeftPanel from '../../components/AuthLeftPanel';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      // Store login timestamp
      localStorage.setItem('loginTime', new Date().toISOString());

      toast.success('Login successful');
      navigate('/dashboard/candidates');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <AuthLeftPanel />

      <div className="login-right">
        <div className="logo">LOGO</div>
        <h2>Welcome to Dashboard</h2>
        <form onSubmit={handleLogin}>
          <label>Email Address*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />

          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />

          <div className="form-footer">
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" disabled={!email || !password}>Login</button>
        </form>

        <p className="register-link">
          Don’t have an account? <span onClick={() => navigate('/register')}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;

