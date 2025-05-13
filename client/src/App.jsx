import React, {useEffect} from 'react';
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
import AllBlogs from './pages/AllBlogs';
import { setUser, setProfile, setUserId } from './feature/auth.sclice';
import { api } from "./utils/axiosInstance";
import { useDispatch } from 'react-redux';
import PrivateRoute from './pages/PrivateRoute';

const App = () => {
   const dispatch = useDispatch();
  
    useEffect(() => {
      const logHost = async() => {
        const accessToken = localStorage.getItem('token');
        //console.log(accessToken);
  
        if(!accessToken) return;
  
        try {
          const response = await api.get("/users/protected", {headers:
            {
              Authorization: `Bearer ${accessToken}`
            }
          }
          );
         console.log(response.data.data.firstName);
          dispatch(setUser(response.data.data.firstName));
          dispatch(setProfile(response.data.data.profile));
          dispatch(setUserId(response.data.data._id));
        } catch (error) {
          console.log("Error on login host: ", error);
        }
      }
  
      logHost();
    }, [])
  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={<Layout />}>
       <Route path="" element={<Home />}/>
       <Route path='login' element={<Login />} />
       <Route path="about" element={<About />} />
       <Route path="signup" element={ <SignUp />} />
       <Route path='getAll' element={<AllBlogs /> } />
       {/* <Route path="blogs" element={ <Blogs />} /> */}
      <Route element={<PrivateRoute />}>
         <Route path="profile" element={ <Profile />}>
          <Route index element={ <Blogs />} />
          <Route path='textEditor' element={<TextEditor />}/>
      </Route>
      </Route>
       
       <Route path='blogPost/:id' element={ <BlogPost />} />
       </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
