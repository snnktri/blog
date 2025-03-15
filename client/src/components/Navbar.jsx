import React, { useState } from 'react';
import { GrCloudComputer } from "react-icons/gr";
import { NavLink } from "react-router";
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  const [isOpen, setIsOpne] = useState(false);

  const navItems = (
    <>
        <NavLink to="/" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Home
        </NavLink>
        <NavLink to="/login" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Log In
        </NavLink>
        <NavLink to="/signup" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         Register
        </NavLink>
        <NavLink to="/about" className={({isActive}) => `${isActive ? 'text-orange-200': 'text-white'} hover:text-orange-300`}>
         About
        </NavLink>
    </>
  )
  return (
    <header className='w-full bg-gray-800 top-0 left-0 text-white relative'>
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex flex-row w-full justify-between'>
              <div className='text-xl font-bold'>
                Blog Website
              </div>
              <div className='hidden md:block'>
                <div className='flex ml-10 items-baseline space-x-2'>
                  {navItems}
                </div>
              </div>
            </div>
            <div className='md:hidden absolute bg-transparent right-5'>
              <button onClick={() => {setIsOpne(!isOpen)} } type='button'>
                <IoIosMenu size={32} className='fill-white'/>
              </button>
            </div>
          </div>
        </nav>

        {
          isOpen&& (
            <div className='flex flex-col gap-y-2 md:hidden px-6 sm:px-6 pb-2 z-10 absolute right-0 bg-gray-700'>
              {navItems}
            </div>
          )
        }
    </header>
  )
}
export default Navbar
