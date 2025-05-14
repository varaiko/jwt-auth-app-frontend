import { useEffect, useState } from "react";
import { authHeader, showToastError, showToastSuccess } from "../utils/UtilFunctions";
import { API_BASE } from "../config";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoadingAndErrorHandling from "../components/LoadingAndErrorHandling";
import api from "../auth/api";

const UserDetailPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, roleResponse] = await Promise.all([
          api.get(`${API_BASE}/api/users/user-info/${id}`, authHeader()),
          api.get(`${API_BASE}/api/roles`, authHeader()),
        ]);
        setUserData(userResponse.data);
        const matchedRole = roleResponse.data.content.find(
          (role) => role.name === userResponse.data.role
        );
        if (matchedRole) {
          setSelectedItem(matchedRole);
        }
        setRoles(roleResponse.data.content);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      id: userData.id,
      username: userData.username,
      role: selectedItem.name,
    };
    try {
      await api.put(`${API_BASE}/api/users/update-user`, data, authHeader());
      showToastSuccess("User has been updated.");
    } catch (err) {
      showToastError("Error occurred during updating user. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetPassword = async () => {
    const data = { email: userData.username };
    setIsSubmitting(true);
    try {
      await api.post(`${API_BASE}/api/auth/forgot-password`, data);
      showToastSuccess("User has been sent a link to reset password.");
    } catch (err) {
      showToastError("Error occurred during user password reset. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteUser = async () => {
    setIsSubmitting(true);
    try {
      await api.delete(`${API_BASE}/api/users/delete-user/${userData.id}`, authHeader());
      showToastSuccess("User has been deleted. You will be forwarded to user management page.");
      setTimeout(() => {
        navigate("/usermanagement");
      }, 3000);
    } catch (err) {
      showToastError("Error occurred during deleting the user. Try again later.");
      setIsSubmitting(false);
    }
  };

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <div className="container my-5 d-flex justify-content-center">
        <div className="col-md-10 col-lg-6">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="text-center mb-4"><h2 className="text-dark fw-bold">User Management</h2><p className="text-muted mb-0">Edit user details and role</p></div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="form-label text-muted">Username</label>
                <input type="text" id="username" className="form-control border-0 border-bottom bg-transparent rounded-0 px-1 py-3" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} required />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="form-label text-muted">User Role</label>
                <div className="dropdown">
                  <button type="button" className="form-control text-start bg-white border-0 shadow-sm rounded-3 py-3 dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">{selectedItem.name || 'Select a role'}</button>
                  <ul className="dropdown-menu shadow-sm border-0 rounded-3 w-100" aria-labelledby="dropdownMenuButton">
                    {roles.map((item, index) => (
                      <li key={index}><button type="button" className="dropdown-item py-2" onClick={() => setSelectedItem(item)}>{item.name}</button></li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-center mt-4 text-muted small">
                Last login: {userData.lastLoginDate || "N/A"} <br />
              </div>
              <div className="d-grid mt-4 mb-3">
                <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm" disabled={isSubmitting}>Save Changes</button>
              </div>
              <div className="d-flex justify-content-between gap-3">
                <button type="button" className="btn btn-outline-primary w-100 rounded-3 shadow-sm" onClick={resetPassword} disabled={isSubmitting}>Reset Password</button>
                <button type="button" className="btn btn-outline-danger w-100 rounded-3 shadow-sm" onClick={deleteUser} disabled={isSubmitting}>Delete User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LoadingAndErrorHandling>
  );
};

export default UserDetailPage;
