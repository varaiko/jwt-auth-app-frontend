import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center p-8 rounded-2xl bg-white shadow-xl max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Oops! Something Went Wrong</h1>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or an other error occurred.
        </p>
        <p className="text-gray-600 mb-6">
          You will be forwarded to homepage.
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
