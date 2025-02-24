import React, { Component } from 'react'
import '../../styles/App.css'
import image1 from '../../assets/images/prev.jpg'; 
import image2 from '../../assets/images/prev1.jpg';
import image3 from '../../assets/images/prev2.jpg';
import image4 from '../../assets/images/prev3.jpg';
import image5 from '../../assets/images/prev4.png';
import image6 from '../../assets/images/prev5.png';
import insta from '../../assets/images/insta.png';
import fb from '../../assets/images/fb.png';
import gmail from '../../assets/images/gmail.png';

export class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [image1, image2, image3, image4, image5, image6],
      shuffledImages: [],
    };
  }

  componentDidMount() {
    this.shuffleImages();
    
    this.interval = setInterval(() => {
      this.shuffleImages();
    }, 1000); 
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  shuffleImages() {
    const shuffled = [...this.state.images];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.setState({ shuffledImages: shuffled });
  }

  render() {
    const { shuffledImages } = this.state;
    return (
        <div className='main-section'>
          <div className='hero-container'>
            <div className='hero-title'>
              <h1>TAP Design Studio</h1>
              <div className='hero-sub-title'>
              <h3>THE ARKI PROJECT</h3>
              </div>
              <div className='hero-catchphrase'>
                <h4>Designing spaces that inspire, innovate, and transform the way you live and work.</h4>
              </div>
              <div className='reachIcons'>
                  <div className="icons"><img src={insta} alt="insta" /></div>
                  <div className="icons"><img src={fb} alt="fb" /></div>
                  <div className="icons"><img src={gmail} alt="gmail" /></div>
              </div>
            </div>
          </div>

          <div className='hero-right'>
            <div className="image-grid">
              {shuffledImages.length > 0 && shuffledImages.slice(0, 4).map((image, index) => (
                <div className="image-item" key={index}>
                  <img src={image} alt={`image-${index + 1}`} />
                </div>
              ))}
            </div>
            <div className='about-button'>
            <button>view projects &#8594;</button>
          </div>
          <div className='slider'>
          <div className='list'>
            <div className="item"  style={{ '--position': 1 }}><h3> &#183; Architecture </h3></div>
            <div className="item" style={{ '--position': 2 }}><h3> &#183; Planning  </h3></div>
            <div className="item" style={{ '--position': 3 }}><h3> &#183; Design </h3></div>
          </div>
        </div>
          </div>
        </div>
    )
  }
}

export default Hero
