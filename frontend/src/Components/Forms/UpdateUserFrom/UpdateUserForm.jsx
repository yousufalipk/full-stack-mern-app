import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import axios from 'axios';

const UpdateUserForm = () => {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { userId, fname, lname, email } = useParams();

  const handleBack = async () => {
    navigate('/manage-users');
  }

  const formik = useFormik({
    initialValues: {
      fname: fname,
      lname: lname
    },
    validationSchema: Yup.object({
      fname: Yup.string()
        .required('First Name is required'),
      lname: Yup.string()
        .required('Last Name is required')
    }),
    onSubmit: async (values, { resetForm }) => {
      const shouldDelete = window.confirm(`Are you sure you want update ${email}?`);
      if (shouldDelete) {
        try {
          const response = await axios.put(`${apiUrl}/update-user`, {
            fname: values.fname,
            lname: values.lname,
            userId: userId
          });
          if (response.data.status === 'Success') {
            toast.success(response.data.message);
            navigate('/manage-users')
          }
          else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log("Error", error);
          toast.error("Internal Server Error!")
        }
      }
      resetForm(); // Clear form data
    }
  });

  return (
    <>
      <div className='flex flex-row justify-between'>
        <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
          Update User (<span className='text-blue-500'>{email}</span>)
        </h1>
        <div className='w-2/4 max-10 flex flex-row justify-end'>
          <button
            className='mx-2 bg-red-500 py-1 px-4 rounded-md text-white hover:text-black'
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className='mx-2 bg-bluebtn py-1 px-4 rounded-md text-white hover:text-gray-600'
            onClick={formik.handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
      <hr className='my-5 border-1 border-[black] mx-2' />
      <div className='h-4/5 flex flex-col justify-center items-center'>
        <form className='flex flex-col w-full'>
          <label for='fname' className='w-2/4 mx-auto px-5 font-semibold'>First Name</label>
          <input className='p-3 my-3 border-2 rounded-xl w-2/4 mx-auto'
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

          <label for='fname' className='w-2/4 mx-auto px-5 font-semibold'>First Name</label>
          <input className='p-3 my-2 border-2 rounded-xl w-2/4 mx-auto'
            type='text'
            id='lname'
            name='lname'
            placeholder='Last Name'
            autoComplete="lname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lname}
          />
          {formik.touched.lname && formik.errors.lname ? (
            <div className='text-red-600 text-center'>{formik.errors.lname}</div>
          ) : null}
        </form>
      </div>
    </>
  )
}

export default UpdateUserForm;
