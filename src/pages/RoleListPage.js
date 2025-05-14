import { useNavigate } from "react-router-dom";
import PaginatedSearch from "../components/PaginatedSearch";
import LoadingAndErrorHandling from "../components/LoadingAndErrorHandling";
import PaginatedSearchControls from "../components/PaginatedSearchControls";

const RoleListPage = () => {
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
    pageSizeOptions
  } = PaginatedSearch({
    baseSearchUrl: "roles/search-role",
    baseListUrl: "roles",
    sortBy: "name,desc"
  });
  const navigate = useNavigate();

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <div className="container my-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 mb-4">
          <h2 className="mb-0 text-primary">Roles</h2>
          <button className="btn btn-success" onClick={() => navigate("/createnewrole")}>Create New Role</button>
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
          searchPlaceholder="Search roles..."
        />
        <div className="row">
          {data.map((role, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-0 card-hover" onClick={() => navigate(`/role/${role.id}`)}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">{role.name}</h5>
                  <p className="card-text text-muted mb-0">{role.description || "No description available."}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingAndErrorHandling>
  );
};

export default RoleListPage;
