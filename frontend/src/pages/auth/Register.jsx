import React, { useState } from 'react';
import '../../styles/AuthStyle.css';
import LogoW from '../../assets/images/Logo.png';
import { useNavigate } from 'react-router-dom'; 

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: ''
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
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful:', data);
        navigate('/admin');
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='register-container'>
      <div className='logo-register'>
        <img src={LogoW} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label><br />
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
        /><br />

        <label htmlFor="lastName">Last Name</label><br />
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
        /><br />

        <label htmlFor="email">Email</label><br />
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        /><br />

        <label htmlFor="userName">Username</label><br />
        <input 
          type="text" 
          name="userName" 
          value={formData.userName} 
          onChange={handleChange} 
        /><br />

        <label htmlFor="password">Password</label><br />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        /><br />

        <input type="submit" value="Register" />
      </form>
      <p>Already have an account? Login <span><a href="/admin">here</a></span></p>
    </div>
  );
};

export default Register;
