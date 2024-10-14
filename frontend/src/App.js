import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './components/login';
import WelcomePage from './components/welcome';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/components/login" element={<LoginPage />} /> */}
        <Route path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
};

export default App;
