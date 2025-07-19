"use client"

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Signup = () => {
    const router = useRouter()
    type UserState = {
        email: string;
        password: string;
        username: string;
    }

    const [user, setUser] = useState<UserState>({
        email: "",
        password: "",
        username: ""
    });
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user);
            console.log("SignUp Success. ", response.data);
            router.push('/login')
        } catch (error) {
            console.log({ error });
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred");
            }
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div>
            <h1 className='flex flex-col items-center justify-center min-h-screen py-2'>
                <h1 className='mb-5 text-2xl'>{loading ? "Processing" : "Sign UP"}</h1>
                <hr  />
                <label htmlFor="username">username</label>
                <input
                    id='username'
                    value={user.username}
                    onChange={(e) => { setUser({ ...user, username: e.target.value }) }}
                    placeholder='username'
                    className='py-2 px-4 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 '
                    type="text" />
                <label htmlFor="username">Email</label>
                <input
                    id='email'
                    value={user.email}
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                    placeholder='Email'
                    className='py-2 px-4 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 '
                    type="text" />
                <label htmlFor="username">Password</label>
                <input
                    id='password'
                    value={user.password}
                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                    placeholder='username'
                    className='py-2 px-4 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 '
                    type="text" />
            </h1>
        </div>
    );
};

export default Signup;