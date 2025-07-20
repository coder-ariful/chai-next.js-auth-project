'use client'

import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
    // const router = useRouter()

    const [token, setToken] = useState('')
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', { token });
            setVerified(true)
            setError(false)
        } catch (error) {
            setError(true)
            console.log("this is the Error :", error);
        }
    }

    // get token
    useEffect(() => {
        // ========== method 1 ======================
        const uriToken = window.location.search.split('=')[1];
        setToken(uriToken || "")
        setError(false)

        // ========= method 2 ======================
        // const { query } = router;
        // setToken(
        //     typeof query.token === 'string'
        //         ? query.token
        //         : Array.isArray(query.token)
        //             ? query.token[0]
        //             : ''
        // );

        // ========= method 3 ======================
        // const { query } = router;

        // if (typeof query.token === 'string') {
        //     setToken(query.token);
        // } else if (Array.isArray(query.token)) {
        //     setToken(query.token[0]);
        // } else {
        //     setToken('');
        // }

    }, [])

    // check for button edit
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-4xl'>Verify Email</h1>
            <p className='mt-4 py-1 px-2 bg-orange-500 '>
                {
                    token ? (`${token}`) : ('No Token')
                }
            </p>

            {
                error && (
                    <div>
                        <h2>Invalid Token or This Token is not valid </h2>
                        <p className='mt-2'>you can <Link href="/signup" className='text-blue-500 hover:underline'>sign up again</Link>.</p>
                    </div>
                )
            }

            {verified && (
                <div>
                    <h2> You Are Verified</h2>
                    <p className='mt-2'> Now, you can <Link href="/login" className='text-blue-500 hover:underline'>sign in</Link>.</p>
                </div>
            )}
            {error && (
                <div>
                    <h2> {error} </h2>
                </div>
            )}

            {/* {
                !error && (
                    <p className='mt-2'>If you didn&apos;t receive an email, you can <Link href="/signup" className='text-blue-500 hover:underline'>sign up again</Link>.</p>
                ) || ""
            } */}

        </div>
    );
};
