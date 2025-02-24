import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import { BASE_URL } from "../config.js";
import "../styles/AuthStyle.css";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/projects`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="projects-container-list">
      <h2>Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="project-cards-list">
          {projects.map((project) => (
            <div key={project._id} className="project-card-list">
              <div className="project-item">
                <div className="proj-img">
                  <img
                    src={`${BASE_URL}/uploads/${project.image}` || "https://via.placeholder.com/300"}
                    alt={project.title}
                    className="project-image-list"
                  />
                </div>
                <div className="project-details-list">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};  
export default ProjectsList;
