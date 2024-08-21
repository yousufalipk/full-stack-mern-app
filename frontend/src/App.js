import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import Loader from './Components/Loader/Loader';

// Importing Layouts
import AuthLayout from './Layouts/AuthLayout/AuthLayout';
import AdminLayout from './Layouts/AdminLayout/AdminLayout';

import ProtectedRoute from './Components/Protected/Protected';

function App() {
  const [isAuth, setAuth] = useState(false);
  const [userType, setUserType] = useState(false);

  const [loading, setLoading] = useState(true); 
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post(`${apiUrl}/refresh`, null, {
          withCredentials: true,
        });

        if (response.data.auth) {
          console.log("Tokens Refreshed!");
          setAuth(true);
        } else {
          setAuth(false);
          console.log("Auth Set False!");
        }
      } catch (error) {
        setAuth(false);
        console.log("Internal Server Error!", error);
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, [isAuth]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        {!isAuth ? (
          <>
            <Route path="/auth/log-in" element={<AuthLayout setAuth={setAuth} setUserType={setUserType}/>} />
            <Route path="*" element={<AuthLayout setAuth={setAuth} setUserType={setUserType}/>} />
          </>
        ) : (
          <>
            <Route path="/admin" element={<ProtectedRoute isAuth={isAuth}><AdminLayout setAuth={setAuth} userType={userType} /></ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute isAuth={isAuth}><AdminLayout setAuth={setAuth} userType={userType} /></ProtectedRoute>} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
