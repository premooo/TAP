import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Make sure to import Link for routing
import { API_BASE_URL } from "../../config.js";
import '../../styles/AuthStyle.css';

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

  // Delete project
  const handleDelete = async (id) => {
    console.log(`Sending DELETE request for project with ID: ${id}`);
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (confirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/admin/project/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log('Project deleted successfully');
        // Update state to remove the deleted project
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project");
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  return (
    <div className="project-table-container">
      <h2>Projects</h2>
      <div className="add-btn-container"><Link className="add-btn" to="/admin/project">Add Project</Link></div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>{project.title}</td>
                <td>{project.description}</td>
                <td className="actions">
                  <Link className="edit-btn" to={`/admin/project/list/edit/${project._id}`}>Edit</Link>
                  <button className="delete-btn" onClick={() => handleDelete(project._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProjectsList;
