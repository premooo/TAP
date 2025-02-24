import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../styles/AuthStyle.css";
import {BASE_URL} from "../../config.js"


const Dashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [careerCount, setCareerCount] = useState(0);

  useEffect(() => {
    // Fetch the project count
    axios.get(`${BASE_URL}/api/admin/project/count`)
      .then((response) => {
        setProjectCount(response.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the project count!", error);
      });

    // Fetch the career count
    axios.get('/api/admin/career/count')
      .then((response) => {
        setCareerCount(response.data.count);
      })
      .catch((error) => {
        console.error("There was an error fetching the career count!", error);
      });
  }, []); 

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="stats-container">
        <div className="stat-item">
          <h3>Projects Uploaded</h3>
          <p>{projectCount}</p>
        </div>
        <div className="stat-item">
          <h3>Careers Uploaded</h3>
          <p>{careerCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
