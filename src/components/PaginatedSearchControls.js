const PaginatedSearchControls = ({
    currentPage,
    totalPages,
    search,
    pageSize,
    pageSizeOptions,
    changeCurrentPage,
    setSearch,
    handleSearch,
    handlePageSizeChange
  }) => {
  return (
    <div>
      <div className="row gy-3 align-items-center mb-4">
        <div className="col-lg-6 d-flex justify-content-center justify-content-lg-start">
            <div className="btn-group" role="group">
            <button className="btn btn-outline-secondary" onClick={() => changeCurrentPage(-1)} disabled={currentPage === 0}>← Prev</button>
            <button className="btn btn-light disabled">Page {currentPage + 1} / {totalPages}</button>
            <button className="btn btn-outline-secondary" onClick={() => changeCurrentPage(1)} disabled={currentPage === totalPages - 1}>Next →</button>
            </div>
        </div>
        <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
            <div className="input-group" style={{ maxWidth: "400px" }}>
              <input type="text" className="form-control" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
              <button className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
            </div>
        </div>
      </div>
      <div className="d-flex justify-content-end mb-3">
        <div className="dropdown">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Show: {pageSize}</button>
          <ul className="dropdown-menu">
            {pageSizeOptions.map(size => (
              <li key={size}><button className="dropdown-item" onClick={() => handlePageSizeChange(size)}>{size} per page</button></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaginatedSearchControls;