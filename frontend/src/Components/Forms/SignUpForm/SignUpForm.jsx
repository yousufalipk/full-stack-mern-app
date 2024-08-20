import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUpForm = (props) => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('First Name is required'),
      lname: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a @gmail.com')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(`${apiUrl}/register-user`, {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }, {
          withCredentials: true
        });

        if (response.data.status === "success") {
          try {
            localStorage.setItem('email', values.email);
            setTimeout(() => {
              toast.success("Account Created! Succesfully!");
            }, 2000);
            props.setAuth(true);
            navigate('/admin');
          } catch (error) {
            console.log(error);
            toast.error('Internal Server Error!');
          }
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Internal Server Error");
        console.log("Error", error);
      }
      resetForm(); // Clear form data
    }
  });

  return (
    <div>
      <h3 className='text-2xl font-bold mx-2'>Welcome!</h3>
      <h2 className='text-2xl mx-2'>Create Your New Account</h2>
      <form onSubmit={formik.handleSubmit} className='flex flex-col'>
        <input className='p-3 mx-2 my-3 border-2 rounded-xl'
          type='text'
          id='fname'
          name='fname'
          autoComplete="fname"
          placeholder='First Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fname}
        />
        {formik.touched.fname && formik.errors.fname ? (
          <div className='text-red-600 text-center'>{formik.errors.fname}</div>
        ) : null}
        
        <input className='p-3 mx-2 my-3 border-2 rounded-xl'
          type='text'
          id='lname'
          name='lname'
          autoComplete="lname"
          placeholder='Last Name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lname}
        />
        {formik.touched.fname && formik.errors.lname ? (
          <div className='text-red-600 text-center'>{formik.errors.lname}</div>
        ) : null}

        <input className='p-3 mx-2 my-3 border-2 rounded-xl'
          type='text'
          id='email'
          name='email'
          autoComplete="email"
          placeholder='Email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='text-red-600 text-center'>{formik.errors.email}</div>
        ) : null}

        <input className='p-3 mx-2 my-3 border-2 rounded-xl'
          type='password'
          id='password'
          name='password'
          autoComplete="password"
          placeholder='Password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.email && formik.errors.password ? (
          <div className='text-red-600 text-center'>{formik.errors.password}</div>
        ) : null}

        <input className='p-3 mx-2 my-2 border-2 rounded-xl'
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          placeholder='Confirm Password'
          autoComplete="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className='text-red-600 text-center'>{formik.errors.confirmPassword}</div>
        ) : null}

        <button type='submit' className='bg-bluebtn w-36 p-3 mx-2 my-1 rounded-md text-white'>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;