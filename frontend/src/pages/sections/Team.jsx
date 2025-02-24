import React, { Component } from 'react'
import TeamPic from '../../assets/images/team.png'
import Logo from '../../assets/images/Logo-White.png';

export class Team extends Component {
  render() {
    return (
      <div className='team-section'>
        <div className='team-title'>
            <h1>Meet the team</h1>
        </div>
        <div className='logo-team'>
            <div><img src={Logo} alt="" /></div>
        </div>
        <div className='team-content'>
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem porro repellat iusto et eos, recusandae laudantium aperiam molestiae neque, nostrum quod esse explicabo eum labore omnis illo atque maxime qui!</h3>
        </div>
        <div className='team-img'>
            <img src={TeamPic} alt="" />
        </div>
      </div>
    )
  }
}

export default Team
