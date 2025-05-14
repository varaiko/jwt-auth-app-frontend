import { Route, Routes } from "react-router-dom";
import { AuthData } from "../auth/AuthWrapper";
import { nav } from "./Navigation";

export const RenderRoutes = () => {

  const { user } = AuthData();

  return (
    <Routes>
      { nav.map((r, i) => {
        if (!user.isAuthenticated && !r.isAuthenticated) {
          return <Route key={i} path={r.path} element={r.element}/>
        } else if (user.isAuthenticated) {
          if (user.permissions.includes(r.hasPermissions.toString())) {
            return <Route key={i} path={r.path} element={r.element}/>
          } else if (r.hasRole.toString() === user.roles) {
            return <Route key={i} path={r.path} element={r.element}/>
          } else if (!r.isPrivate) {
            return <Route key={i} path={r.path} element={r.element}/>
          }
        }
        return false;
      })}
    </Routes>
  );
};
