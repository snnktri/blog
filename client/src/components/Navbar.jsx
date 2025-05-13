import React, { useState } from 'react';
import { GrCloudComputer } from "react-icons/gr";
import { NavLink } from "react-router";
import { IoIosMenu } from "react-icons/io";
import { useSelector } from 'react-redux';
import { IoPersonCircleSharp } from "react-icons/io5";

const Navbar = () => {
  const profile = useSelector(state => state.user.profile);
  //console.log(profile);
  const [isOpen, setIsOpne] = useState(false);

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const navItems = (
    <>
        <NavLink to="/" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Home
        </NavLink>
        
        <NavLink to="/getAll" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Blogs
        </NavLink>
        <NavLink to="/about" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         About
        </NavLink>
        <NavLink to="/signup" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Register
        </NavLink>
        <NavLink to="/profile" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300 order-first sm:order-none hover:scale-105`}>
           <div className='h-10 w-10 flex items-center justify-center rounded-full bg-gray-500'>
           { profile ? (
              <img 
              src={profile} 
              alt="profile" 
              className='h-full w-full object-cover rounded-full opacity-15' // Ensure image covers the container
            />
            ):
            ( <IoPersonCircleSharp color="black" size={40} />)
          }
           </div>
        </NavLink>
    </>
  )
  return (
    <header className='w-full bg-gray-800 top-0 left-0 text-white relative'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex flex-row w-full justify-between'>
              <div className='text-xl font-bold flex gap-2 justify-center items-center'>
                <NavLink to="/">
                Blog Website</NavLink>
                <div>
                  <input type="text" className='bg-white text-gray-500 text-sm placeholder:text-gray-700 p-1 w-full capitalize rounded' placeholder='search blog....' onChange={handleChange}
                  value={search}/>
                </div>
              </div>
              
              <div className='hidden md:block'>
                <div className='flex ml-10 items-center space-x-2 justify-center'>
                  {navItems}
                </div>
              </div>
            </div>
            <div className='md:hidden absolute bg-transparent right-5 flex justify-center items-center h-auto'>
              <button onClick={() => {setIsOpne(!isOpen)} } type='button' className='cursor-pointer'>
                <IoIosMenu size={32} className='fill-white'/>
              </button>
            </div>
          </div>
        </nav>

        {
          isOpen&& (
            <div className='flex flex-col gap-y-2 md:hidden px-6 sm:px-6 pb-2 z-10 absolute right-0 bg-gray-700 transition ease-in duration-300 delay-300 p-2 rounded-bl-md'>
              {navItems}
            </div>
          )
        }
    </header>
  )
}
export default Navbar
