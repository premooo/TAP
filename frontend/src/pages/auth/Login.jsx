import React, { useState } from 'react';
import '../../styles/AuthStyle.css';
import { useNavigate } from 'react-router-dom'; 
import LogoW from '../../assets/images/Logo.png';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('Token:', localStorage.getItem('token'));
        console.log('User:', localStorage.getItem('user'));
        
        navigate('/dashboard');
      } else {
        console.error('Error:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-container'>
      <div className='logo-login'>
        <img src={LogoW} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label><br />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        /><br />

        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        /><br />

        <input type="submit" value="Login" />
      </form>
      <p>Don't have an account? Register <span><a href="/register">here</a></span></p>
    </div>
  );
};

export default Login;
