import React from 'react';
import Contact from './Contact';

const NavBar = () => {
  return (
    <div className='topnav'>
    <span className='topnavtext'>
       <span className='title'>QuickKeys</span> 
    </span>
    <span class='removeContact'>
    <Contact />
    </span>
  </div>
  )
}

export default NavBar;
