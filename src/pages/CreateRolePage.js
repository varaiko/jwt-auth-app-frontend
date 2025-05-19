import { useState } from "react";
import { authHeader, showToastError } from "../utils/UtilFunctions";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import api from "../auth/api";

const CreateRolePage = () => {

  const [roleName, setRoleName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let data = {
        name: roleName
      };
      const response = await api.post(`${API_BASE}/roles`, data, authHeader());
      navigate(`/role/${response.data.id}`);
    } catch (error) {
      showToastError("Could not create a new role. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm p-4 border-0 rounded-3">
            <h2 className="text-center mb-4 text-dark">Create new role</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label text-muted">Role name:</label>
                <input type="text" id="title" className="form-control border-0 shadow-sm rounded-3 py-3" value={roleName} onChange={(e) => setRoleName(e.target.value)} required/>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3 px-5 py-3" disabled={isSubmitting}>
                  {isSubmitting ? 'Creating...' : 'Create new role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRolePage;
