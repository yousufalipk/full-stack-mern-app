import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Loader from '../../Components/Loader/Loader';

import { RiDeleteBin5Line } from "react-icons/ri";

const ManageUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/fetch-users`);
      if (response.data.status === 'success') {
        setUsers(response.data.users)
      }
      else {
        console.log("Error fetching data!")
      }
    } catch (error) {
      console.log('Error', error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);

  }, [users])


  const handleDeleteUser = async (id, email) => {
    try {
      const shouldDelete = window.confirm(`Are you sure you want remove ${email}?`);
      if (shouldDelete) {
        const response = await axios.delete(`${apiUrl}/remove-user`, {
          data: {
            userId: id
          }
        })

        if (response.data.status === 'success') {
          toast.success(response.data.message);
          fetchData();
        }
        else {
          toast.error(response.data.message);
          fetchData();
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const handleUpdateUser = (id, fname, lname, email) => {
    navigate(`/update-user/${id}/${fname}/${lname}/${email}`);
  }

  const handleAddUser = () => {
    navigate(`/add-user`);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {users && !loading && (
        <>
          <div>
            <div className='flex flex-row justify-between'>
              <h1 className='font-bold text-left mx-10 w-full max-w-2xl'>
                Add User
              </h1>
              <div className='w-2/4 max-10 flex flex-row justify-end'>
                <button
                  className='mx-2 bg-bluebtn py-1 px-4 rounded-md text-white hover:text-gray-600'
                  onClick={handleAddUser}
                >
                  Add User
                </button>
              </div>
            </div>
            <hr className='my-5 border-1 border-[black] mx-2' />
          </div>
          <div className='h-full mx-2 my-5'>
            <table className="min-w-full bg-white border-collapse border border-gray-200">
              <thead className="thead-light">
                <tr>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Sr.No</th>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">First Name</th>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Last Name</th>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Email</th>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Update</th>
                  <th className='px-6 py-3 border-b-2 border-gray-300 text-sm text-center' scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map((index, key) => (
                    <tr key={key}>
                      <th scope="row">
                        <span style={{ fontWeight: "bold" }}>
                          {key + 1}
                        </span>
                      </th>
                      <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                        {index.fname}
                      </td>
                      <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                        {index.lname}
                      </td>
                      <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                        {index.email}
                      </td>
                      <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                        <button className='bg-bluebtn p-2 rounded-md text-white hover:text-black'
                          onClick={() => handleUpdateUser(index._id, index.fname, index.lname, index.email)}
                        >
                          Update
                        </button>
                      </td>
                      <td className='px-6 py-4 border-b border-gray-200 text-sm text-center'>
                        <button className='p-2'
                          onClick={() => handleDeleteUser(index._id, index.email)}
                        >
                          <RiDeleteBin5Line className='text-gray-600 w-5 h-5 hover:text-black' />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}

export default ManageUser;
