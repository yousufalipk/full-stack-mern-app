import React from 'react';
import { Routes, Route } from 'react-router-dom';

//Importing LogIn & SignUp Page
import LoginPage from '../../Pages/LoginPage/LoginPage';
import SignUpPage from '../../Pages/SignupPage/SignupPage';

//NavBar
import NavBar from '../../Components/NavBar/NavBar';

//Vector Image 
import AuthImage from '../../Assets/auth-img.jpg';

const AuthLayout = (props) => {
  return (
    <>
    <div className='flex'>
      {/* Left Auth */}
      <div className=' w-1/3'>
        {/* Nav Bar */} 
        <div>
          <NavBar />
        </div>
        <div>
          <Routes>
            <Route path="*" element={<LoginPage setAuth={props.setAuth} />} />
            <Route path="/register" element={<SignUpPage setAuth={props.setAuth} />} />
          </Routes>
        </div>
      </div>
      {/* Right Image */}
      <div className='w-2/3'>
        <img className='h-screen w-screen' src={AuthImage} alt="Vector Image" />
      </div>
    </div>
    </>
  )
}

export default AuthLayout
