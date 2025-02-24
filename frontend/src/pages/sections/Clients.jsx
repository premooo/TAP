import React, { Component } from 'react';
import axios from 'axios'; // Import axios to make API calls
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class Clients extends Component {
  state = {
    projects: [], // Store the fetched projects
  };

  componentDidMount() {
    this.fetchLatestProjects();
  }

  // Function to fetch the latest two projects from the API
  fetchLatestProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/projects');
      const latestProjects = response.data.slice(0, 2); // Get only the first 2 projects
      this.setState({ projects: latestProjects });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  render() {
    const { projects } = this.state;

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    };

    const testimonials = [
      {
        client: "Nike",
        feedback: "Amazing service and great quality products!",
        image: require('../../assets/images/client/nike.png'),
      },
      {
        client: "H&M",
        feedback: "Professional team and exceptional results!",
        image: require('../../assets/images/client/hm.png'),
      },
      {
        client: "Jordan",
        feedback: "Exceeded our expectations. Highly recommend!",
        image: require('../../assets/images/client/jordan.png'),
      },
      {
        client: "Ferrari",
        feedback: "The best experience we've had so far!",
        image: require('../../assets/images/client/ferrari.png'),
      },
    ];

    return (
      <div className="client-section">
        <div className="client-title">
          <h1>What Our Clients Say</h1>
        </div>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-box">
              <div className="testimonial-content">
                <img
                  src={testimonial.image}
                  alt={testimonial.client}
                  className="testimonial-logo"
                />
                <p className="testimonial-feedback">"{testimonial.feedback}"</p>
                <h3 className="testimonial-client">- {testimonial.client}</h3>
              </div>
            </div>
          ))}
        </Slider>
        <div className="line-divider"></div>

        {/* Latest Projects */}
        <div className="project-section">
          <div className="project-title">
            <h1>
              Latest <br /> Projects
            </h1>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos voluptatum accusamus consequatur libero autem ipsa
              labore dicta! Temporibus unde saepe similique vitae
            </h4>
            <Link className="edit-btn" to="/project/list">
              All Projects
            </Link>
          </div>
          <div className="project-container">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={project._id} className="project-card">
                  <div className="proj-img">
                    <img
                      src={`http://localhost:5000/uploads/${project.image}`}
                      alt={`Project ${index + 1}`}
                    />
                  </div>
                  <div className="project-details">
                    <h3>{project.title}</h3>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading projects...</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Clients;
