"use client"

import React, { useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signin = () => {
    const router = useRouter()
    type UserState = {
        email: string;
        password: string;
    }

    const [user, setUser] = useState<UserState>({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user);
            console.log("SignIn Success. ", response.data);
            setLoading(false)
            router.push('/profile')
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
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <form className='flex flex-col w-96 p-6 rounded shadow-md'>
                <h1 className='mb-5 text-2xl'>{loading ? "Processing" : "Sign In"}</h1>
                <label htmlFor="email">Email</label>
                <input
                    id='email'
                    value={user.email}
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                    placeholder='Email'
                    className='py-2 px-4 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 '
                    type="email" />
                <label htmlFor="password">Password</label>
                <input
                    id='password'
                    value={user.password}
                    onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                    placeholder='Password'
                    className='py-2 px-4 border border-gray-300 rounded mb-4 focus:outline-none focus:border-gray-600 '
                    type="text" />

                <button
                    disabled={buttonDisabled || loading}

                    onClick={() => { toast.success("It worked!"); onSignup() }}
                    className={`py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 ${loading ? "opacity-50 cursor-not-allowed" : ""} ${buttonDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}

                >
                    Sign In
                </button>
            </form>
            <p> <Link href="/signup" className='text-blue-600 hover:underline'>Create an account</Link></p>

        </div>
    );
};

export default Signin;