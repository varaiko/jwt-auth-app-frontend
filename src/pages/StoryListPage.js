import { useNavigate } from 'react-router-dom';
import { AuthData } from '../auth/AuthWrapper';
import PaginatedSearch from '../components/PaginatedSearch';
import LoadingAndErrorHandling from '../components/LoadingAndErrorHandling';
import PaginatedSearchControls from '../components/PaginatedSearchControls';

const StoryListPage = () => {
  const { user } = AuthData();
  const navigate = useNavigate();

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
    baseSearchUrl: "stories/search",
    baseListUrl: "stories",
    sortBy: "date,desc",
  });

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <div className="container my-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-center gap-3 mb-4">
          <h2 className="mb-0 text-dark">Stories</h2>
          {user.permissions.includes("CREATE_STORY") && (
            <button className="btn btn-success" onClick={() => navigate("/createnewstory")}>Create New Story</button>
          )}
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
        />
        <div className="row">
          {data.map((story, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-sm h-100 border-0 card-hover" onClick={() => navigate(`/story/${story.id}`)}>
                <img className="card-img-top rounded-top" src={story.url} alt={story.title} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-dark">{story.title}</h5>
                  <p className="card-text text-truncate">{story.content}</p>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between text-muted small">
                      <span>By {story.username}</span>
                      <span>{new Date(story.date).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </LoadingAndErrorHandling>
  );
};

export default StoryListPage;
