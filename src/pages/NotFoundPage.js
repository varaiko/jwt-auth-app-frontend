const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-light">
      <div className="text-center p-6 rounded-2xl bg-white">
        <h1 className="text-2xl font-bold text-dark mb-2">404 - Page Not Found</h1>
        <p className="text-muted mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;