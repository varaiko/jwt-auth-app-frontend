import { useNavigate } from "react-router-dom";
import PaginatedSearch from "../components/PaginatedSearch";
import LoadingAndErrorHandling from "../components/LoadingAndErrorHandling";
import PaginatedSearchControls from "../components/PaginatedSearchControls";

const UserListPage = () => {

  const {
    data,
    search,
    setSearch,
    currentPage,
    totalPages,
    pageSize,
    loading,
    error,
    handleSearch,
    changeCurrentPage,
    handlePageSizeChange,
    pageSizeOptions,
  } = PaginatedSearch({
    baseSearchUrl: "users/search",
    baseListUrl: "users",
    sortBy: "username,desc",
  });
  const navigate = useNavigate();

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <div className="container my-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 mb-4">
          <h2 className="mb-0 text-primary">Users</h2>
        </div>
        <PaginatedSearchControls
          currentPage={currentPage}
          totalPages={totalPages}
          search={search}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          changeCurrentPage={changeCurrentPage}
          setSearch={setSearch}
          handleSearch={handleSearch}
          handlePageSizeChange={handlePageSizeChange}
          searchPlaceholder="Search users..."
        />
        <div className="row">
          {data.map((user, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-0 card-hover" onClick={() => navigate(`/user/${user.id}`)}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{user.username}</h5>
                  <p className="card-text mb-2 text-muted">
                    <strong>Role:</strong> {user.role}
                  </p>
                  <p className="card-text text-muted">
                    <strong>Permissions:</strong> {Array.isArray(user.permissions) ? user.permissions.join(", ") : user.permissions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingAndErrorHandling>
  );
};

export default UserListPage;
