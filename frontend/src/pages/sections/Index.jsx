import React, { Component } from 'react';
import Hero from './Hero';
import About from './About';
import Team from './Team';
import Clients from './Clients';
import Footer from '../../components/footer';
import Career from './Career';


export class Index extends Component {

render(){
    return (
      <main>
        <Hero />
        <About />
        <Team />
        <Clients />
        <Career />
        <Footer />
      </main>
    );
  }
}

export default Index;
