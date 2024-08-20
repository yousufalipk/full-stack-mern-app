import React from 'react';
import {Routes, Route} from 'react-router-dom';

import SideBar from '../../Components/SideBar/SideBar';

import HomePage from '../../Pages/HomePage/HomePage';

const AdminLayout = (props) => {
  return (
    <>  
        {/* Side Bar */}
        <div className='flex flex-row'>
          <div className='w-1/5'>
            <SideBar setAuth={props.setAuth}/>
          </div> 
          {/* Content */}
          <div className='p-10 w-full'> 
          <HomePage />
          </div>
        </div>
    </>
  )
}

export default AdminLayout
