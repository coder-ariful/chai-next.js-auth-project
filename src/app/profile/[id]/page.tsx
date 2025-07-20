// 'use client'
import React from 'react';

interface PageProps {
    params: {
        id: string;
    };
}

const page = ({ params }: PageProps) => {
    console.log(params.id);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>Profile Page</h1>
            <h3 className='p-3 bg-green-600 rounded text-black'>{params.id}</h3>
        </div>
    );
};

export default page;