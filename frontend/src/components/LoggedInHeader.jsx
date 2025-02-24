import React, { useState, useEffect } from 'react';
import '../styles/Header.css';
import LogoW from '../assets/images/LogoW.png';

const LoggedInHeader = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // Set the user data if available
    }
  }, []);

  const handleLogout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin"; // Redirect to login page
  };

  return (
    <div className="header-container">
      <div className="header-Img">
        <img src={LogoW} alt="Logo" />
      </div>
      <div className="user-header">
        {user ? (
          <>
            <span>{user.firstName} {user.lastName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <span>Loading...</span> 
        )}
      </div>
    </div>
  );
};

export default LoggedInHeader;
