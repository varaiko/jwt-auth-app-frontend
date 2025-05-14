import { useEffect, useState } from "react";
import { authHeader, showToastError, showToastSuccess } from "../utils/UtilFunctions";
import LoadingAndErrorHandling from "../components/LoadingAndErrorHandling";
import { API_BASE } from "../config";
import { useParams } from "react-router-dom";
import api from "../auth/api";

export const RoleDetailPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [role, setRole] = useState([]);
  const [permissions, setPermissions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roleResponse, permResponse] = await Promise.all([
          api.get(`${API_BASE}/api/roles/` + id, authHeader()),
          api.get(`${API_BASE}/api/permissions`, authHeader()),
        ]);
        setRole(roleResponse.data);
        const updatedPermissions = permResponse.data.map((x) => ({
          ...x,
          granted: roleResponse.data.permissions.includes(x.name),
        }));
        setPermissions(updatedPermissions);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const togglePermission = (id) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm) =>
        perm.id === id ? { ...perm, granted: !perm.granted } : perm
      )
    );
  };
      
  const saveChanges = async () => {
    const permissionIds = permissions
      .filter((perm) => perm.granted)
      .map((perm) => perm.id);

    try {
      await api.post(`${API_BASE}/api/roles/` + id, { permissionIds }, authHeader());
      showToastSuccess("Role has been changed");
    } catch (err) {
      showToastError("Error happened during saving the role. Please try again later.");
    }
  };

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      {permissions && (
        <div className="container my-5" style={{ maxWidth: "800px" }}>
          <h2 className="text-dark mb-4 text-center">Managing Permissions for {role.name}</h2>
          <div className="d-flex flex-column gap-3">
            {permissions.map((perm, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center p-3 bg-white rounded shadow-sm">
                <label className="form-check-label fs-5 mb-0" htmlFor={`perm-${perm.id}`}>{perm.description}</label>
                <input type="checkbox" className="form-check-input fs-5" id={`perm-${perm.id}`} checked={perm.granted} onChange={() => togglePermission(perm.id)} />
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-100 mt-4 fw-bold fs-5 py-3" onClick={saveChanges}>Save Changes</button>
        </div>
      )}
    </LoadingAndErrorHandling>
  );
};

export default RoleDetailPage;
