import React, { Component } from 'react'
import '../styles/Footer.css';
import insta from '../assets/images/insta.png';
import fb from '../assets/images/fb.png';
import gmail from '../assets/images/gmail.png';
import LogoW from '../assets/images/Logo-White.png';

export class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <footer>
          <div className='line-footer'></div>
            <div className='footer-container'>
                <div className='left-container'>
                  <div className='left-image'><img src={LogoW} alt="" /></div>
                </div>
                <div className="middle-container">
                    <div className='left-header'>
                        <h1>Contact</h1>
                    </div>
                    <div className='left-info'>
                        <h4 className='location'>Location: <span>TBA</span></h4>
                        <h4 className='email'>Email: <span>lorem @gmail.com</span></h4>
                        <h4 className='phone'>Phone: <span>1289378</span></h4>
                    </div>

                </div>
                <div className="right-container">
                    <div className='right-header'>
                        <h1>Links</h1>
                    </div>
                    <div className='right-info'>
                      <div className="icons-footer"><img src={fb} alt="" /></div>
                      <div className="icons-footer"><img src={insta} alt="" /></div>
                      <div className="icons-footer"><img src={gmail} alt="" /></div>
                    </div>
                </div>
            </div>
        </footer>
      </div>
    )
  }
}

export default Footer
