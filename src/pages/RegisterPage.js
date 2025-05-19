import React, { useState } from 'react';
import { API_BASE } from "../config";
import { useNavigate } from 'react-router-dom';
import { showToastError, showToastSuccess } from '../utils/UtilFunctions';
import api from '../auth/api';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      showToastError("Please fill in your e-mail and password to register an account");
    }

    setIsSubmitting(true);

    const userData = { username: email, password: password };

    try {
      await api.post(`${API_BASE}/auth/register`, userData);
      showToastSuccess("User has been registered. You will be forwarded to login page.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      if (err.status === 409) {
        showToastError("User with such e-mail already exists.");
        setIsSubmitting(false);
      } else {
        showToastError("User was not able to be registered. Please check that everything has been filled in and try again.");
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-md-10 col-lg-6">
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Create Your Account</h2>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3" style={{ boxShadow: 'none' }} />
            </div>
            <div className="mb-4">
              <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3" style={{ boxShadow: 'none' }} />
            </div>
            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm" disabled={isSubmitting}>{isSubmitting ? 'Registering account' : 'Register account'}</button>
            </div>
          </form>
          <div className="text-center">
            <button type="button" className="btn btn-link text-muted text-decoration-none" onClick={() => navigate("/login")}>← Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
