import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API_BASE } from "../config";
import { useNavigate } from 'react-router-dom';
import { showToastError, showToastSuccess } from '../utils/UtilFunctions';
import api from '../auth/api';

const ResetPasswordPage = () => {

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const verifyToken = async () => {
      try {
        const data = { token: token };
        await api.post("http://localhost:8080/api/auth/verify-reset-token", data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== checkPassword) {
      showToastError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    const data = { token: token, newPassword: password };

    try {
      await api.post(`${API_BASE}/api/auth/reset-password`, data);
      showToastSuccess("Password has been reset. You will be forwarded to login page.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      showToastError("Issue happened during password reset. Try again or apply for a new reset link.");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-4">
        <div className="alert alert-danger text-center py-3">Expiration link is incorrect or the link has expired.</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-sm p-4 border-0 rounded-3">
              <h2 className="text-center mb-4 text-dark">Change your password</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label text-muted">Enter your new password</label>
                  <input type="password" id="password" className="form-control border-0 shadow-sm rounded-3 py-3" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label text-muted">Confirm your new password</label>
                  <input id="checkPassword" type="password" className="form-control border-0 shadow-sm rounded-3 py-3" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} required />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3 px-5 py-3" disabled={isSubmitting}>{isSubmitting ? 'Changing...' : 'Change Story'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
