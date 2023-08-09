import React from "react";
import logo from "../images/logo.jpg";
import profileIcon from "../images/profile.png"; // Replace with the path to your profile icon image

const Header = () => {
  return (
    <header className=' flex items-center justify-between p-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-lg'>
      {/* Left-hand side logo and college name */}
      <div className='flex items-center'>
        <img src={logo} alt='Logo' className='w-14 h-14 mr-2 rounded-full' />
        <h1 className='text-xl font-bold'>Wadduwa Central College</h1>
      </div>

      {/* Right-hand side profile icon */}
      <div className='flex items-center'>
        <img
          src={profileIcon}
          alt='Profile'
          className='w-12 h-12 rounded-full cursor-pointer transform hover:scale-110 transition-transform duration-300'
        />
      </div>
    </header>
  );
};

export default Header;
