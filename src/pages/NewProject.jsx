import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { newProject } from "../services/projectService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

const NewProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url_image: "",
    url_video: "",
    min_investment: 10,
    max_investment: 100,
    limit_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    console.log("Enviando datos:", formData); // Para debug
    
    try {
      const response = await newProject(formData);
      console.log("Respuesta exitosa:", response.data);
      navigate("/"); // Redirect to projects page after successful creation
    } catch (error) {
      console.error("Error completo:", error);
      console.error("Error response:", error.response);
      setError(error.response?.data?.message || error.message || "Error al crear el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#fbf5e9" }}>
        <div className="col-md-8">
          <div className="card shadow-lg" style={{ borderRadius: "15px", backgroundColor: "#fdf7ee" }}>
            <div className="card-body">
              <h3 className="text-center mb-4" style={{ color: "#4e5d6c" }}>New Project</h3>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Título:</label>
                  <input type="text" id="title" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Descripción:</label>
                  <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="url_image" className="form-label">URL Imagen:</label>
                  <input type="text" id="url_image" name="url_image" className="form-control" value={formData.url_image} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="url_video" className="form-label">URL Video:</label>
                  <input type="text" id="url_video" name="url_video" className="form-control" value={formData.url_video} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="min_investment" className="form-label">Inversión Mínima:</label>
                  <input type="number" id="min_investment" name="min_investment" className="form-control" min="10" step="0.01" value={formData.min_investment} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="max_investment" className="form-label">Inversión Máxima:</label>
                  <input type="number" id="max_investment" name="max_investment" className="form-control" min="15" step="0.01" value={formData.max_investment} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="limit_date" className="form-label">Fecha Límite:</label>
                  <input type="date" id="limit_date" name="limit_date" className="form-control" value={formData.limit_date} onChange={handleChange} required min={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Enviando..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
