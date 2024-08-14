
import React from 'react';
import logo from '../utils/logo.png'; 
import profile from '../profile.png'; 
import '../index.css';

const Header = () => {
  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-3 space-x-6">
        <a href="#home" className="flex items-center "> 
          <img src={logo}  width="30" height="30" alt="Logo" className='text-white' />
        </a>
	
        <div className="hidden md:flex flex-grow items-center space-x-6">
		<p className="font-bold pt-2.5 text-gray-300 hover:text-white focus:text-white transition-colors ">Low code platform</p>

          <a 
            href="#Dashboard" 
            className="font-bold text-gray-300 hover:text-white focus:text-white transition-colors duration-300"
          >
            Dashboard
          </a>
          <a 
            href="#Workflow Builder" 
            className="font-bold text-gray-300 hover:text-white focus:text-white transition-colors duration-300"
          >
            Workflow Builder
          </a>
          <a 
            href="#Screen Builder" 
            className="font-bold text-gray-300 hover:text-white focus:text-white transition-colors duration-300"
          >
            Screen Builder
          </a>
          <a 
            href="#APK Builder" 
            className="font-bold text-gray-300 hover:text-white focus:text-white transition-colors duration-300"
          >
            APK Builder
          </a>
        </div>
        <div className="flex items-center">
          <a href="#profile" className="ml-3">
            <img
              src={profile}
              width="50"
              height="30"
              className="rounded-full"
              alt="Profile"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
