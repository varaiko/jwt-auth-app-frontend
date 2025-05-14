import React from 'react';
import { AuthData } from "../auth/AuthWrapper";

const ProfilePage = () => {
  const { user } = AuthData();

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <p>
            <strong>Username:</strong> {user.name}
          </p>
          <p>
            <strong>Role:</strong> {Array.isArray(user.roles) ? user.roles.join(", ") : user.roles}
          </p>
          <p className="text-muted small mb-0">
            Last login: {user.lastLoginDate || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;