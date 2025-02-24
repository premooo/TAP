import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AppRouteWrapper from './routing/AppRoute'; 

function App() {
  return (
    <Router> {/* Wrap AppRouteWrapper with Router */}
      <AppRouteWrapper />
    </Router>
  );
}
export default App;
