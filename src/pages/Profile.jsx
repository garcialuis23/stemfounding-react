import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../services/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/styles.css";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getUserById(id);
        console.log("User data:", response.data);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center">{error}</p>;
  }

  if (!user) {
    return <p className="text-center">User not found</p>;
  }

  console.log("User investments:", user.investments);

  const projectGroups = [
    { status: 'active', title: 'Active Projects', icon: 'check-circle-fill', color: 'primary' },
    { status: 'pending', title: 'Pending Projects', icon: 'hourglass-split', color: 'warning' },
    { status: 'inactive', title: 'Inactive Projects', icon: 'moon', color: 'black' }
  ];

  return (
    <div className="container py-4">
      <div className="row align-items-center mb-5">
        <div className="col-md-3 text-center">
          <img
            src={user.url_img}
            alt={user.name}
            className="img-fluid rounded-circle shadow"
            style={{ maxWidth: "200px", border: "5px solid #E6CBA8" }}
          />
        </div>
        <div className="col-md-9">
          <div className="bg-light p-4 rounded shadow-sm border">
            <h4 className="fw-bold text-primary">{user.name}</h4>
            <p className="text-muted mb-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-muted mb-2"><strong>Role:</strong> {user.role}</p>
          </div>
        </div>
      </div>

      {user.role === 'emprendedor' && (
        <>
          {projectGroups.map((group) => (
            <div key={group.status}>
              <h3 className={`mb-4 text-${group.color}`}>
                <i className={`bi bi-${group.icon}`}></i> {group.title}
              </h3>
              <div className="row">
                {user.projects.filter(project => project.status === group.status).map((project) => (
                  <div className="col-md-4 mb-4" key={project.id}>
                    <div className={`card shadow-sm h-100 border border-${group.color}`}>
                      <div className="card-body">
                        <h5 className={`card-title text-${group.color}`}>{project.title}</h5>
                        <p className="card-text">{project.description}</p>
                        <Link to={`/projects/${project.id}`} className={`btn btn-outline-${group.color} btn-sm`}>About</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {user.projects.length === 0 && (
            <p>You have not created any projects yet.</p>
          )}
        </>
      )}

      {user.role === 'investor' && (
        <>
          <h3 className="mb-4 text-primary">
            <i className="bi bi-cash-stack"></i> My Investments
          </h3>
          <div className="row">
            {user.investments && user.investments.length > 0 ? (
              user.investments.map((investment) => (
                <div className="col-md-4 mb-4" key={investment.id}>
                  <div className="card shadow-sm h-100 border border-primary">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        <Link to={`/projects/${investment.project.id}`}>{investment.project.title}</Link>
                      </h5>
                      <p className="card-text"><strong>Invested Amount:</strong> {investment.amount} €</p>
                      <p className="card-text"><strong>Investment Date:</strong> {investment.created_at}</p>
                    
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>You have not made any investments yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;