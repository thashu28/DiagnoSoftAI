import React from 'react';
import {Routes , Route} from 'react-router-dom'
import WelcomePage from '../components/welcome_page';

const layout = () => {
  return <>
    <main>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
      </Routes>
    </main>
  </>
};

export default layout