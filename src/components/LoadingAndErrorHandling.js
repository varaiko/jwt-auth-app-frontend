import ErrorPage from '../pages/ErrorPage';

const LoadingAndErrorHandling = ({ loading, error, children }) => {
  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

  if (error) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};

export default LoadingAndErrorHandling;
