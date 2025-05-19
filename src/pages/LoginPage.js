import React, { useState } from 'react';
import { setCookie, showToastError } from '../utils/UtilFunctions';
import { API_BASE } from "../config";
import { useNavigate } from 'react-router-dom';
import { AuthData } from '../auth/AuthWrapper';
import api from '../auth/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { refreshUserData } = AuthData();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (email === '' || password === '') {
      showToastError('Please fill in both fields.');
      setIsSubmitting(false);
      return;
    }

    const userData = { username: email, password: password };

    try {
      const response = await api.post(`${API_BASE}/auth/login`, userData);
      setCookie('access_token', response.data.access_token, 999999999);
      setCookie('refresh_token', response.data.refresh_token, 999999999);
      await refreshUserData();
      navigate('/');
    } catch (err) {
      showToastError('Wrong password, email or user does not exist');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-md-10 col-lg-6">
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Login</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3" style={{ boxShadow: 'none' }} />
            </div>
            <div className="mb-4">
              <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3" style={{ boxShadow: 'none' }} />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm" disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-link text-muted text-decoration-none" onClick={() => navigate('/forgot-password')}>Forgot your password?</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
