import { useEffect, useState } from 'react';
import { authHeader, showToastError } from '../utils/UtilFunctions';
import LoadingAndErrorHandling from '../components/LoadingAndErrorHandling';
import { API_BASE } from "../config";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../auth/api';

const EditStoryPage = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openStoryContent, setOpenStoryContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${API_BASE}/api/stories/${id}`, authHeader());
        setOpenStoryContent(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      delete openStoryContent.comments;
      await api.put(`${API_BASE}/api/stories/changestory/${id}`, openStoryContent, authHeader());
      navigate(`/story/${id}`);
    } catch (err) {
      showToastError("Could not change the story. Check all required fields and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteStory = async () => {
    try {
      await api.delete(`${API_BASE}/api/stories/${id}`, authHeader());
      navigate("/stories");
    } catch {
      showToastError("Could not delete the story. Please try again later.");
    }
  };

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      <div className="container my-5 d-flex justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="text-center mb-4">
              <h2 className="text-primary fw-bold">Edit Story</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label text-muted">Story Title</label>
                <input type="text" id="title" className="form-control border-0 border-bottom bg-transparent rounded-0 px-1 py-3" value={openStoryContent.title} onChange={(e) => setOpenStoryContent({ ...openStoryContent, title: e.target.value })} required />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="form-label text-muted">Story Content</label>
                <div className="p-3 rounded-3 bg-light" style={{ minHeight: '250px', fontSize: '1.1rem', lineHeight: '1.75' }}>
                  <textarea id="content" className="form-control border-0 bg-transparent px-0 py-0" style={{ height: '100%', resize: 'none', fontSize: 'inherit', lineHeight: 'inherit' }} value={openStoryContent.content} onChange={(e) => setOpenStoryContent({ ...openStoryContent, content: e.target.value })} required rows="8" />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="url" className="form-label text-muted">Story Picture URL</label>
                <input type="text" id="url" className="form-control border-0 border-bottom bg-transparent rounded-0 px-1 py-3" value={openStoryContent.url} onChange={(e) => setOpenStoryContent({ ...openStoryContent, url: e.target.value })} required />
              </div>
              <div className="d-grid gap-3">
                <button type="submit" className="btn btn-primary btn-lg rounded-3 shadow-sm" disabled={isSubmitting}>{isSubmitting ? 'Changing...' : 'Change Story'}</button>
                <button type="button" className="btn btn-outline-danger btn-lg rounded-3 shadow-sm" onClick={deleteStory}>Delete Story</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LoadingAndErrorHandling>
  );
};

export default EditStoryPage;
