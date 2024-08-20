import React from 'react';
import Logo from '../../Assets/Logo/logo.png';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SideBar = (props) => {

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleLogOut = async () => {
    // LogOut Logic 
    try {
      const response = await axios.post(
        `${apiUrl}/logout-user`,
        {},
        {
          withCredentials: true
        }
      );


      if (response.data.status === "success") {
        setTimeout(() => {
          toast.success("Logged Out Succesfully!");
        }, 2000);
        navigate('/')
        props.setAuth(false);
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Internal Server Error!');
    }
  }

  return (
    <>
      <div className='flex flex-col justify-between h-screen bg-gray-200'>
        {/* Logo */}
        <div className='flex flex-col items-center mt-4'>
          <Link to='/'>
            <img src={Logo} alt="Logo" className='w-24 h-24' />
          </Link>

          {/* Menu*/}
          <div className='flex flex-col mt-4 w-full'>
            <Link className='w-full py-5 px-10' to='/'>Home</Link>
            <hr className='border-1 border-[gray] w-4/5 mx-auto'/>
            <Link className='w-full py-5 px-10' to='/about'>About</Link>
            <hr className='border-1 border-[gray] w-4/5 mx-auto'/>
            <Link className='w-full py-5 px-10' to='/users'>Users</Link>
            <hr className='border-1 border-[gray] w-4/5 mx-auto'/>
          </div>
        </div>

        {/* Logout button*/}
        <div className='my-10 w-full'>
          <button className='flex flex-row px-10 py-5 w-full' onClick={handleLogOut}>
            Log Out <FiLogOut className='mx-3 mt-1' />
          </button>
        </div>
      </div>
    </>

  )
}

export default SideBar;
