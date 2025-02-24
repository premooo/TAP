import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { API_BASE_URL } from "../../config.js";
import "../../styles/AuthStyle.css";

const Project = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle the file drop
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB.");
    } else {
      setImage(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  // Handle form submission
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) formData.append("image", image);

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/project`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Project uploaded successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (err) {
      setMessage("Failed to upload project");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="project-page">
      <h2 className="page-title">Upload Project</h2>
      {message && <p className="message">{message}</p>}

      <div className="project-container">
        {/* Left Side: Drag-and-Drop Area */}
        <div className="upload-section" {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="drop-area">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded preview"
                className="preview-image"
              />
            ) : (
              <p>Drag and drop an image, or click to select one</p>
            )}
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="form-section">
          <form onSubmit={handleProjectSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Uploading..." : "Upload Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Project;
