import React from 'react';
import {Routes , Route} from 'react-router-dom'
import WelcomePage from '../components/welcome_page';
import LoginPage from '../components/login';
import SignupPage from '../components/signup';

const layout = () => {
  return <>
    <main>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
    </main>
  </>
};

export default layout