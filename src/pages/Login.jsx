import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

// Static credentials for demo (do not use in production)
const STATIC_USER = 'admin';
const STATIC_PASS = 'admin123';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('nurasey_user')) {
      navigate('/products', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (username.trim() === STATIC_USER && password === STATIC_PASS) {
      localStorage.setItem('nurasey_user', username);
      navigate('/products', { replace: true });
    } else {
      setError('Invalid username or password. Try admin / admin123');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Plant Shopping</h1>
          <p>Sign in to continue</p>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <!--<p className="login-hint">
          Demo: <strong>{STATIC_USER}</strong> / <strong>{STATIC_PASS}</strong>
        </p>-->
      </div>
    </div>
  );
}

export default Login;
