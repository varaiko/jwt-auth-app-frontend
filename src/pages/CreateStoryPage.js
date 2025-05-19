import { useState } from "react";
import { AuthData } from "../auth/AuthWrapper";
import { authHeader, showToastError } from "../utils/UtilFunctions";
import { API_BASE } from "../config";
import { useNavigate } from "react-router-dom";
import api from "../auth/api";

const CreateStoryPage = () => {

  const { user } = AuthData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let data = {
        title: title,
        username: user.name,
        content: content,
        url: url
      };
      const response = await api.post(`${API_BASE}/stories`, data, authHeader());
      navigate(`/story/${response.data.id}`);
    } catch (error) {
      showToastError('Failed to create the story');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-sm p-4 border-0 rounded-3">
            <h2 className="text-center mb-4 text-dark">Submit Your Story</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="form-label text-muted">Story Title:</label>
                <input type="text" id="title" className="form-control border-0 shadow-sm rounded-3 py-3" value={title} onChange={(e) => setTitle(e.target.value)} required/>
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="form-label text-muted">Story Content:</label>
                <textarea id="content" className="form-control border-0 shadow-sm rounded-3 py-3 " value={content} onChange={(e) => setContent(e.target.value)} required rows="6"/>
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="form-label text-muted">Story Picture URL:</label>
                <input type="text" id="title" className="form-control border-0 shadow-sm rounded-3 py-3" value={url} onChange={(e) => setUrl(e.target.value)} required/>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg shadow-sm rounded-3 px-5 py-3" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStoryPage;
