import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProjectById,
  getInvestmentsByProjectId,
  deleteComment2,
  updateComment2,
  addComment2,
  inactivateProject,
  updateProject,
} from "../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [newComment, setNewComment] = useState({
    comment: "",
    comment_image: "",
  });
  const [editProject, setEditProject] = useState({
    title: "",
    description: "",
    url_image: "",
    url_video: "",
  });

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await getProjectById(id);
        console.log("Project data:", response.data);
        setProject(response.data);
        setEditProject({
          title: response.data.title,
          description: response.data.description,
          url_image: response.data.url_image,
          url_video: response.data.url_video,
        });
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Error fetching project data");
      } finally {
        setLoading(false);
      }
    }

    async function fetchInvestments() {
      try {
        const response = await getInvestmentsByProjectId(id);
        console.log("Investments data:", response.data);
        setInvestments(response.data);
      } catch (error) {
        console.error("Error fetching investments:", error);
        setError("Error fetching investments data");
      }
    }

    fetchProject();
    fetchInvestments();
  }, [id]);

  const handleDeleteComment = async (commentIndex) => {
    try {
      await deleteComment2(id, commentIndex);
      setProject((prevProject) => {
        const updatedComments = prevProject.comments.filter(
          (_, index) => index !== commentIndex
        );
        return { ...prevProject, comments: updatedComments };
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditCommentChange = (e) => {
    const { name, value } = e.target;
    setEditComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditComment = async () => {
    try {
      await updateComment2(id, editCommentIndex, editComment);
      setProject((prevProject) => {
        const updatedComments = prevProject.comments.map((comment, index) =>
          index === editCommentIndex ? editComment : comment
        );
        return { ...prevProject, comments: updatedComments };
      });
      setEditComment(null);
      setEditCommentIndex(null);

      // Cerrar el modal manualmente
      const modalElement = document.getElementById("editCommentModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleNewCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddNewComment = async () => {
    try {
      const response = await addComment2(id, newComment);
      setProject((prevProject) => ({
        ...prevProject,
        comments: [...prevProject.comments, response.data],
      }));
      setNewComment({ comment: "", comment_image: "" });

      // Cerrar el modal manualmente
      const modalElement = document.getElementById("addCommentModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleInactivateProject = async () => {
    try {
      await inactivateProject(id);
      setProject((prevProject) => ({
        ...prevProject,
        status: "inactive",
      }));
    } catch (error) {
      console.error("Error inactivating project:", error);
    }
  };

  const handleEditProjectChange = (e) => {
    const { name, value } = e.target;
    setEditProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEditProject = async () => {
    try {
      await updateProject(id, editProject);
      setProject((prevProject) => ({
        ...prevProject,
        ...editProject,
      }));

      // Cerrar el modal manualmente
      const modalElement = document.getElementById("editProjectModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (!project) {
    return <p className="text-center">Project not found</p>;
  }

  return (
    <div className="container mt-5" style={{ backgroundColor: "#FBF5E9" }}>
      <div className="row">
        <div className="col-md-6">
          <div
            id="projectCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={project.url_image}
                  className="d-block w-100"
                  alt={project.title}
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
              {project.url_video && (
                <div className="carousel-item">
                  <iframe
                    className="d-block w-100"
                    src={project.url_video}
                    style={{ height: "300px" }}
                  ></iframe>
                </div>
              )}
            </div>
            <a
              className="carousel-control-prev"
              href="#projectCarousel"
              role="button"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#projectCarousel"
              role="button"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className="card shadow-lg"
            style={{
              borderRadius: "15px",
              backgroundColor: "#FDF7EE",
              height: "100%",
            }}
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-primary">{project.title}</h5>
              <p className="card-text">{project.description}</p>
              <p>
                <strong>Minimum Investment:</strong> {project.min_investment}
              </p>
              <p>
                <strong>Maximum Investment:</strong> {project.max_investment}
              </p>
              <p>
                <strong>Limit Date:</strong> {project.limit_date}
              </p>

              <p>
                <strong>Current Investment:</strong>{" "}
                {project.current_investment}
              </p>

              <p>
                <strong>Status:</strong>
                {project.status === "active"
                  ? "✅"
                  : project.status === "pending"
                  ? "⚠️"
                  : "💤"}
              </p>

              <div className="progress mb-3" style={{ height: "25px" }}>
                <div
                  className="progress-bar bg-brown"
                  role="progressbar"
                  style={{
                    width: `${
                      (project.current_investment / project.max_investment) *
                      100
                    }%`,
                  }}
                  aria-valuenow={project.current_investment}
                  aria-valuemin="0"
                  aria-valuemax={project.max_investment}
                >
                  {(
                    (project.current_investment / project.max_investment) *
                    100
                  ).toFixed(2)}
                  %
                </div>
              </div>

              {project.status === "active" ? (
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-primary mb-3"
                    onClick={handleInactivateProject}
                  >
                    Inactivate Project
                  </button>
                  <button
                    className="btn btn-secondary mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#editProjectModal"
                  >
                    Edit Project
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-secondary btn-lg mb-3"
                  data-bs-toggle="modal"
                  data-bs-target="#editProjectModal"
                >
                  Edit Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {investments.length > 0 && (
        <div className="row mt-5">
          <div className="col-12">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-brown">
                <tr>
                  <th>Name</th>
                  <th>Money</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr key={investment.id}>
                    <td>{investment.user.name}</td>
                    <td>{investment.amount}€</td>
                    <td>{investment.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="row mt-5">
        <div className="col-12">
          {project.status === "active" && (
            <button
              type="button"
              className="btn btn-primary mb-3"
              data-bs-toggle="modal"
              data-bs-target="#addCommentModal"
            >
              Add Comment
            </button>
          )}
          {project.comments &&
            project.comments.map((comment, index) => (
              <div className="card mb-3 shadow-sm" key={index}>
                <div className="card-body d-flex">
                  {comment.comment_image && (
                    <img
                      src={comment.comment_image}
                      className="me-3"
                      alt="Comment"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <div className="flex-grow-1">
                    <p>{comment.comment}</p>
                    <p className="text-muted">
                      <small>Created at: {comment.created_at}</small>
                      <br />
                      <small>Last edited: {comment.updated_at}</small>
                    </p>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn btn-warning btn-sm me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#editCommentModal"
                        onClick={() => {
                          setEditComment(comment);
                          setEditCommentIndex(index);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteComment(index)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal para añadir comentario */}
      <div
        className="modal fade"
        id="addCommentModal"
        tabIndex="-1"
        aria-labelledby="addCommentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCommentModalLabel">
                Add Comment
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="newComment" className="form-label">
                  Comment
                </label>
                <textarea
                  className="form-control"
                  id="newComment"
                  name="comment"
                  rows="3"
                  value={newComment.comment}
                  onChange={handleNewCommentChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="newCommentImage" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newCommentImage"
                  name="comment_image"
                  value={newComment.comment_image}
                  onChange={handleNewCommentChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddNewComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar comentario */}
      {editComment && (
        <div
          className="modal fade"
          id="editCommentModal"
          tabIndex="-1"
          aria-labelledby="editCommentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editCommentModalLabel">
                  Edit Comment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="comment" className="form-label">
                    Comment
                  </label>
                  <textarea
                    className="form-control"
                    id="comment"
                    name="comment"
                    rows="3"
                    value={editComment.comment}
                    onChange={handleEditCommentChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="comment_image" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="comment_image"
                    name="comment_image"
                    value={editComment.comment_image}
                    onChange={handleEditCommentChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEditComment}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar proyecto */}
      <div
        className="modal fade"
        id="editProjectModal"
        tabIndex="-1"
        aria-labelledby="editProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editProjectModalLabel">
                Edit Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="editProjectTitle" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editProjectTitle"
                  name="title"
                  value={editProject.title}
                  onChange={handleEditProjectChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProjectDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="editProjectDescription"
                  name="description"
                  rows="3"
                  value={editProject.description}
                  onChange={handleEditProjectChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="editProjectImage" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editProjectImage"
                  name="url_image"
                  value={editProject.url_image}
                  onChange={handleEditProjectChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editProjectVideo" className="form-label">
                  Video URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editProjectVideo"
                  name="url_video"
                  value={editProject.url_video}
                  onChange={handleEditProjectChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveEditProject}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
