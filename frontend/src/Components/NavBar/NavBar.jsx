import React from 'react';
import Logo from '../../Assets/Logo/logo.jpg';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
        <div>
          <Link to='/'>
            <img src={Logo} alt="Logo"  className='w-24 h-24 my-5 mx-5'/> 
          </Link>
        </div>
    </>
  )
}

export default NavBar;
