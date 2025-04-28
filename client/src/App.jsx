import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router';
import Layout from './Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import SignUp from './pages/SignUp';
import Blogs from './pages/Blogs';
import Profile from './pages/Profile';
import TextEditor from './pages/TextEditor';
import BlogPost from './pages/BlogPost';

const App = () => {
  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={<Layout />}>
       <Route path="" element={<Home />}/>
       <Route path='login' element={<Login />} />
       <Route path="about" element={<About />} />
       <Route path="signup" element={ <SignUp />} />
       <Route path="blogs" element={ <Blogs />} />
       <Route path="profile" element={ <Profile />} />
       <Route path="textEditor" element={ <TextEditor />} />
       <Route path='blogPost/:id' element={ <BlogPost />} />
       </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
