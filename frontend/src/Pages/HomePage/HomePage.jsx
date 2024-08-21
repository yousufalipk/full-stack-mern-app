import React from 'react'

const HomePage = (props) => {
  return (
    <> 
        <div> 
            <h1 className='font-bold mx-10'>
              {props.userType === 'admin' ? (
                <>
                  Admin Dashbaord 
                </>
              ):(
                <>
                  User Dashbaord
                </>
              )}

            </h1>
            <hr className='my-5 border-1 border-[black] mx-2'/> 
        </div>
    </>
  )
}

export default HomePage;
