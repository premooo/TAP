import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config.js";

const CareersList = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch careers from the backend
  const fetchCareers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/careers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCareers(response.data);
    } catch (err) {
      console.error("Error fetching careers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  if (loading) {
    return <p>Loading careers...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Uploaded Careers</h2>
      {careers.length === 0 ? (
        <p>No careers found.</p>
      ) : (
        <ul>
          {careers.map((career) => (
            <li key={career._id} className="mb-6 border-b border-gray-300 pb-4">
              <h3 className="text-xl font-semibold">{career.title}</h3>
              <p className="text-gray-700">{career.description}</p>
              {career.location && <p>Location: {career.location}</p>}
              {career.type && <p>Type: {career.type}</p>}
              {career.salary && <p>Salary: {career.salary}</p>}
              {career.closingDate && (
                <p>Closing Date: {new Date(career.closingDate).toLocaleDateString()}</p>
              )}
              {career.responsibilities && (
                <p>Responsibilities: {career.responsibilities.join(", ")}</p>
              )}
              {career.qualifications && (
                <p>Qualifications: {career.qualifications.join(", ")}</p>
              )}
              {career.benefits && <p>Benefits: {career.benefits.join(", ")}</p>}
              {career.company && <p>Company: {career.company}</p>}
              {career.contactEmail && <p>Contact: {career.contactEmail}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CareersList;
