import { createContext, useContext } from "react"
import { RenderRoutes } from "../components/RenderNavigation";
import AppNavbar from "../components/Navbar";
import ErrorPage from "../pages/ErrorPage";
import LoadingAndErrorHandling from "../components/LoadingAndErrorHandling";
import { useAuthSession } from "./useAuthSession";
import { ToastContainer } from "react-toastify";

const userIntialState = {
  name: "",
  isAuthenticated: false,
  roles: "DEFAULT"
};
const AuthContext = createContext(userIntialState);
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  const { user, loading, error, authReady, refreshUserData } = useAuthSession();

  if (!authReady || loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Verifying session...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <AuthContext.Provider value={{ user, refreshUserData }}>
        <AppNavbar />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <RenderRoutes />
      </AuthContext.Provider>
    </LoadingAndErrorHandling>
  );
};