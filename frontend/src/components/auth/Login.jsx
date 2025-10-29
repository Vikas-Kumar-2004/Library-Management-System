import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // <-- Added Link
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please provide username and password');
      return;
    }

    setLoading(true);
    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      setTimeout(() => {
        if (isAdmin) {
          navigate('/admin/home');
        } else {
          navigate('/user/home');
        }
      }, 100);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1>Library Management System</h1>
        <h2>Login</h2>
        
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={loading}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      
       

        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
