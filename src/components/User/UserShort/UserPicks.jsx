"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { NextUIProvider, DatePicker, Input } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const genderProfileImages = {
    "Male": "/assets/logo/user/man.png",
    "Female": "/assets/logo/user/woman.png",
    "default": "/assets/logo/user/default.png", // Use a default image if needed
};

const UserShort = ({id}) => {
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:6969/user/pick/${id}`);
            if (!response.ok) {
            throw new Error(`cNo data found`);
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            setData([]);
            setError(error.message);
        }
        };
        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const winLose = (result) => {
        if(result == 1){
            return "win";
        }else{
            return "lose";
        }
    };

    return (
        <NextUIProvider>
            <div className='w-full flex gap-4 justify-between rounded-lg border-1 px-4 py-4 text-xs md:text-sm'>
                <div className='flex gap-1 items-center'>
                    <p className='text-black/50 font-medium flex'>Most Leagues:</p>
                    <p className='text-black font-semibold px-2'>NBA</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p className='text-black/50 font-medium flex'>Win Rate:</p>
                    <p className='text-black font-semibold px-2'>56.8%</p>
                </div>
                <div className='flex gap-1 items-center'>
                    <p className='text-black/50 font-medium flex'>Win Streak:</p>
                    <p className='text-black font-semibold px-2'>3</p>
                </div>
            </div>
        </NextUIProvider>
  )
}

export default UserShort