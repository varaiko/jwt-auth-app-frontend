import { useState } from "react";
import { API_BASE } from "../config";
import { showToastError, showToastSuccess } from "../utils/UtilFunctions";
import { useNavigate } from "react-router-dom";
import api from "../auth/api";

const PasswordResetRequestPage = () => {

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email: email };
    setIsSubmitting(true);
    try {
      await api.post(`${API_BASE}/auth/password/forgot`, data);
      showToastSuccess("E-mail with password reset link has been sent to your e-mail. Link is valid for 30 minutes.");
    } catch (err) {
      showToastError("Failed to send password reset e-mail. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container my-5 d-flex justify-content-center">
      <div className="col-md-10 col-lg-6">
        <div className="card border-0 shadow-sm rounded-4 p-4">
          <div className="text-center mb-4">
            <h2 className="text-dark fw-bold">Forgot Password?</h2>
            <p className="text-muted mb-0">Enter your email and password reset will be sent to your e-mail.</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3" style={{ boxShadow: 'none' }} />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm" disabled={isSubmitting}>{isSubmitting ? 'Sending email...' : 'Send reset email'}</button>
            </div>
          </form>
          <div className="text-center mt-3">
            <button type="button" className="btn btn-link text-muted text-decoration-none" onClick={() => navigate("/login")}>← Back to Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequestPage;