"use client"

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Profile = () => {
    const router = useRouter();
   

    const [data, setData] = useState();
    // methods 
    const getUserDetails = async () => {
        try {
            const response = await axios.get('/api/users/dashborad');
            console.log(response.data.data);
            setData(response.data.data._id)

        } catch (error) {
            console.log("There is an Error : ", error);
        }
    }

    const getUserLogout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successfully.')
            router.push('/login')
        } catch (error) {
            console.log("there is error in logout : ", error);
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            this is profile.
            <h1 className='text-2xl mb-4'>User Details</h1>
            {
                !data ? "nothing to See!!" : <div>
                    <Link href={`/profile/${data}`}> {data}</Link>
                </div>
            }
            
            <button onClick={getUserDetails} className='btn bg-blue-500 text-white px-2 rounded py-2 mb-4'>
                Get User Details
            </button>
            <button onClick={getUserLogout} className='btn bg-red-500 text-white px-2 rounded py-2 mb-4'>
                Logout
            </button>
        </div>
    );
};

export default Profile;