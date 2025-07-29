import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import ProjectDetails from "./pages/ProjectDetails";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.css";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      {/* Barra de navegación */}
      <Navbar />

      {/* Definición de rutas */}
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/users/:id" element={<Profile />} />
        </Routes>
      </div>

      <Footer />  
    </Router>
  );
}

export default App;
