import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import SignUp from './pages/SignUp';

const App = () => {
  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={<Layout />}>
       <Route path="" element={<Home />}/>
       <Route path='login' element={<Login />} />
       <Route path="about" element={<About />} />
       <Route path="signup" element={ <SignUp />} />
     </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
