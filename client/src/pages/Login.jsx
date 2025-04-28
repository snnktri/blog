import React, { useState } from 'react';
import { login } from '../apiHandler/user';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUser, setProfile } from "../feature/auth.sclice"

const Login = () => {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add form submission logic (e.g., API call for login)
    //console.log('Login Data:', loginData);
    try {
      const response = await login(loginData);
      if(response.success) {
       // console.log(response);
        dispatch(setUser(response.data.user.firstName));
        dispatch(setProfile(response.data.user.profile));
        localStorage.setItem('token', response.data.accessToken);
        //console.log("data is setup are: ", response.data.user.firstName, response.data.accessToken, response.data.user.profile)
        navigate('/');
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='p-8 my-4 w-[80%] md:w-[60%] lg:w-[40%] bg-white h-auto rounded-2xl shadow-xl shadow-gray-500'>
        <h1 className='text-center text-4xl mb-6 font-bold'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label htmlFor="email" className='block'>Email</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div>
            <label htmlFor="password" className='block'>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              required
              className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500'
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition ease-in dealy-300 cursor-pointer duration-75"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
