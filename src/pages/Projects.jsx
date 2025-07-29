import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { getProjectList } from "../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // Ensure Bootstrap JS is imported
import "../styles/styles.css";
import "../App.css";

function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getProjectList()
      .then((response) => {
        const filtered = response.data.filter(project => project.status !== "rejected" && project.status !== "pending");
        setProjectsList(filtered);
        setFilteredProjects(filtered);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(projectsList);
    } else {
      setFilteredProjects(projectsList.filter(project => project.status === filter.toLowerCase()));
    }
  }, [filter, projectsList]);

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  const handleNewProjectClick = () => {
    navigate("/new-project");
  };

  return (
    <div className="container mt-4">
      {/* Barra superior con botones */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary px-4 dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by Status: {filter}
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><button className="dropdown-item" onClick={() => setFilter("All")}>All</button></li>
            <li><button className="dropdown-item" onClick={() => setFilter("Active")}>Active</button></li>
            <li><button className="dropdown-item" onClick={() => setFilter("Inactive")}>Inactive</button></li>
          </ul>
        </div>
        <button className="btn btn-primary px-4" onClick={handleNewProjectClick}>New Project</button>
      </div>

      {/* Lista de proyectos */}
      {filteredProjects.length > 0 ? (
        <div className="row">
          {filteredProjects.map((project) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: "pointer" }}
            >
              <div
                className={`card h-100 shadow-sm border-3 ${
                  project.status === "inactive" ? "border-danger" : "border-primary"
                }`}
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={
                    project.status === "inactive"
                      ? "https://www.shutterstock.com/image-vector/inactive-grunge-rubber-stamp-on-260nw-607855559.jpg"
                      : project.url_image || "https://via.placeholder.com/300x150?text=NO+IMAGE"
                  }
                  className="card-img-top"
                  alt={project.title}
                  style={{ height: "180px", objectFit: "cover", borderRadius: "10px 10px 0 0" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <p><strong>Minimum Investment:</strong> {project.min_investment}</p>
                  <p><strong>Cut-off time:</strong> {project.limit_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No projects available</p>
      )}
    </div>
  );
}

export default Projects;
