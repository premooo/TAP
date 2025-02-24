import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export class Career extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false, // A flag to trigger navigation
    };
  }

  handleNavigate = () => {
    this.setState({ redirect: true }); // Set redirect flag to true
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/admin/career/list" />;
    }

    return (
      <div className="contact-section" id="career">
        <div className="careers-side">
          <h1>
            <span className="main-text"> Careers</span> in <br /> The Arki
            Project
          </h1>
          <h3>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi quis
            veniam assumenda doloribus! Consectetur eligendi ut veritatis.
            Quisquam, nulla sapiente autem consectetur, tenetur soluta sequi
            quod, enim mollitia non exercitationem?
          </h3>
          <button onClick={this.handleNavigate}>Careers</button>
        </div>
        <div className="contact-side"></div>
      </div>
    );
  }
}

export default Career;
