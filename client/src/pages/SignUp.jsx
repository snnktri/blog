import React, { useState } from 'react';
import { singup } from '../apiHandler/user';
import { useNavigate} from "react-router"
const SignUp = () => {
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profile: null,
    confirmPassword: '',
  });
  const [objectUrl, setObjectUrl] = useState(null);
  const navigate = useNavigate();


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setRegisterData({
     ...registerData,
      profile: file,
    });

    const objectUrl = URL.createObjectURL(file);
    setObjectUrl(objectUrl);

  }

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
   
    if (registerData.password !== registerData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();

    Object.entries(registerData).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (key === 'confirmPassword') {
        
        return;
      } else {
        formData.append(key, value);
      }
    });
    try {
      const response = await singup(formData);
      if (response.success) {
        alert('Registration successful!');
        setRegisterData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          profile: '',
          confirmPassword: '',
        });
        setObjectUrl(null);
        navigate('/login');
      }

    } catch (error) {
      console.error("Error on registration: ", error.message)
    }
   // console.log(formData);
   
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex items-center justify-center">
      <div className="p-8 w-[80%] my-4 md:w-[60%] lg:w-[40%] bg-white h-auto rounded-2xl shadow-xl shadow-gray-500">
        <h1 className="text-center text-4xl mb-6 font-bold">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block">First Name</label>
            <input
              type="text"
              name="firstName"
              value={registerData.firstName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={registerData.lastName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block">Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="profile" className="block">Profile Picture (optional)</label>
            <input
              type="file"
              name="profile"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />

            {objectUrl && (
              <div className="mt-4">
                <img src={objectUrl} alt="Profile" className="w-full h-48 object-cover rounded-md" />
              </div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 hover:scale-105 transition ease-in dealy-300 cursor-pointer duration-75"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p>Already have an account? <span className="text-blue-500 hover:text-blue-600 cursor-ponter" onClick={() => navigate('/login')}>Login</span></p>
        </div>
  
      </div>
    </div>
  );
};

export default SignUp;
