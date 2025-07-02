import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import '../register/Register.css';
import AuthLeftPanel from '../../components/AuthLeftPanel';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const regRes = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      const loginRes = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', loginRes.data.token);
      toast.success('Registered & Logged in');
      navigate('/dashboard');

    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="login-container">
      <AuthLeftPanel /> 

      <div className="login-right">
        <div className="logo">LOGO</div>
        <h2>Welcome to Dashboard</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Full name*</label>
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email Address*</label>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="password-field">
            <label>Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div className="password-field">
            <label>Confirm Password*</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={
              !formData.name ||
              !formData.email ||
              !formData.password ||
              !formData.confirmPassword
            }
          >
            Register
          </button>
        </form>

        <p className="register-link">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
