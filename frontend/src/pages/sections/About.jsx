import React, { Component } from 'react';
import '../../styles/App.css';
import Arch from '../../assets/images/arch.jpg';
import Plan from '../../assets/images/planning.jpg';
import Design from '../../assets/images/design.jpg';

export class About extends Component {
  render() {
    return (
      <div className='about-section' id='about'>
        <div className='section-mini'>
            <h4>why us?</h4>
            <h1>DESIGN TO CREATION <br /> SEAMLESS</h1>
            <div className='section-bio'>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nisi necessitatibus accusamus, sunt explicabo reiciendis, quam, architecto corporis cupiditate sed doloribus ab repellat tempora ea eos aliquid natus corrupti ipsam.</h4>
            </div>
        </div>

        <div className='card-container'>
          <div className='card'>
            <div className='card-img'>
              <img src={Arch} alt="Architecture picture" />
            </div>
            <div className='card-content'>
                <h3>Architecture</h3>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatem non sit impedit accusantium odit pariatur velit molestias delectus recusandae nobis vel iste facere autem magni aspernatur, in nihil doloremque enim!</p>
                <h4>Learn More</h4>
            </div>
          </div>

          <div className='card'>
            <div className='card-img'>
            <img src={Plan} alt="Planning picture" />
            </div>
            <div className='card-content'>
                <h3>Planning</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quam nobis nisi, laborum nulla veniam ducimus totam eveniet, unde voluptatum ipsum ad? Culpa ipsam.</p>
                <h4>Learn More</h4>
            </div>
          </div>

          <div className='card'>
            <div className='card-img'>
            <img src={Design} alt="Design picture" />
            </div>
            <div className='card-content'>
                <h3>Design</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora suscipit voluptatem quaerat, labore eius dolore impedit quisquam voluptas commodi dolor sit. Corporis iste iure autem? Mollitia nemo ducimus vitae itaque!</p>
                <h4>Learn More</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About
