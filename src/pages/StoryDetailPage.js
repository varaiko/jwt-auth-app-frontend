import { useEffect, useState } from "react";
import { AuthData } from "../auth/AuthWrapper";
import { authHeader, showToastError, showToastSuccess } from '../utils/UtilFunctions';
import { API_BASE } from "../config";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoadingAndErrorHandling from '../components/LoadingAndErrorHandling';
import api from '../auth/api';

const StoryDetailPage = () => {
  const { user } = AuthData();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [storyResponse, commentsResponse] = await Promise.all([
          api.get(`${API_BASE}/api/stories/${id}`, authHeader()),
          api.get(`${API_BASE}/stories/comments/${id}`, authHeader()),
        ]);
        setData(storyResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      showToastError("Comment can not be empty");
      return;
    }

    const newCommentObject = { comment: newComment, username: user.name };
    try {
      const response = await api.post(`${API_BASE}/stories/comments/addcomment/${id}`, newCommentObject, authHeader());
      setComments((prevComments) => [...prevComments, response.data]);
      setNewComment("");
      showToastSuccess("Comment added.");
    } catch (err) {
      showToastError("Failed to add comment. Please try again later.");
    }
  };

  const handleEditComment = (commentId, text) => {
    setEditingCommentId(commentId);
    setEditingText(text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText("");
  };

  const handleSaveEdit = async (commentId) => {
    if (!editingText.trim()) {
      showToastError("Comment can not be empty");
      return;
    }

    try {
      const updatedComment = { comment: editingText };
      await api.put(`${API_BASE}/stories/comments/${id}/${commentId}`, updatedComment, authHeader());
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, comment: editingText } : comment
        )
      );
      setEditingCommentId(null);
      setEditingText("");
      showToastSuccess("Comment has been changed.");
    } catch (err) {
      showToastError("Error happened during changing the comment. Please try again later.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`${API_BASE}/stories/comments/${commentId}`, authHeader());
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
      showToastSuccess("Comment deleted");
    } catch (err) {
      showToastError("Could not delete the comment. Please try again later.");
    }
  };

  return (
    <LoadingAndErrorHandling loading={loading} error={error}>
      {data && (
        <div className="container my-5">
          <div className="card shadow-sm mb-4 border-0 rounded-4">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src={data.url} alt="Story" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '450px', objectFit: 'cover', width: '100%' }} />
              </div>
              <div className="mx-auto" style={{ maxWidth: '700px' }}>
                <h2 className="card-title text-primary fw-bold mb-3">{data.title}</h2>
                <p className="card-text" style={{ whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '1.75' }}>{data.content}</p>
                <div className="d-flex justify-content-between text-muted small mb-3">
                  <span>Written by {data.username}</span>
                  <span>{new Date(data.date).toLocaleDateString()}</span>
                </div>
                {((user.permissions.includes("CHANGE_STORY") && user.name === data.username) || user.roles === "SUPERADMIN") && (
                  <div className="text-end">
                    <button className="btn btn-link text-danger text-decoration-none px-0" onClick={() => navigate(`/changestory/${data.id}`)}>Edit post</button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body">
              <h3 className="mb-4 text-dark fw-semibold">Comments</h3>
              {user.permissions.includes("CREATE_COMMENT") && (
                <div className="mb-4">
                  <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment..." className="form-control border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-3 mb-3" rows="3" style={{ boxShadow: 'none' }} />
                  <button onClick={handleAddComment} className="btn btn-primary w-100 rounded-3 shadow-sm" disabled={!newComment.trim()}>Post Comment</button>
                </div>
              )}
              <div className="comments-list">
                {comments.length ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="mb-4 p-3 bg-light rounded-3 border-0 shadow-sm">
                      <div className="d-flex justify-content-between mb-2 text-muted small">
                        <span className="fw-semibold text-dark">{comment.username}</span>
                        <span>{new Date(comment.date).toLocaleDateString()}</span>
                      </div>
                      {editingCommentId === comment.id ? (
                        <div>
                          <textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} className="form-control mb-2 border-0 border-bottom border-secondary-subtle bg-transparent rounded-0 px-1 py-2" />
                          <div className="d-flex gap-2">
                            <button className="btn btn-success" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                            <button className="btn btn-secondary" onClick={handleCancelEdit}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{comment.comment}</p>
                      )}
                      {user.name === comment.username && user.permissions.includes("UPDATE_COMMENT") && editingCommentId !== comment.id && (
                        <div className="d-flex gap-3 mt-2">
                          <button className="btn btn-link text-success px-0" onClick={() => handleEditComment(comment.id, comment.comment)}>Edit</button>
                          <button className="btn btn-link text-danger px-0" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadingAndErrorHandling>
  );
};

export default StoryDetailPage;
