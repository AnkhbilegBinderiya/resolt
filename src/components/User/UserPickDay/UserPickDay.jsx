"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker, Input } from "@nextui-org/react";
import PickCard from '@/components/PickCard/PickCard'

const UserPickDay = ({id}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:6969/user/pick/${id}`);
    //         if (!response.ok) {
    //         throw new Error(`cNo data found`);
    //         }
    //         const result = await response.json();
    //         setData(result);
    //     } catch (error) {
    //         setData([]);
    //         setError(error.message);
    //     }
    //     };
    //     fetchData();
    // }, [id]);

    return (
        <NextUIProvider>
            <div className='w-full rounded-lg flex flex-col'>
                <div className='flex w-full gap-1'>
                    <div className='bg-green-500  grow h-4 rounded-sm'>
                    </div>
                    <div className='bg-widgetLight dark:bg-labelDark grow h-4 rounded-sm'>
                    </div>
                    <div className='bg-widgetLight dark:bg-labelDark grow h-4 rounded-sm'>

                    </div>
                    <div className='bg-red-500 grow h-4 rounded-sm'>

                    </div>
                    <div className='bg-green-500  grow h-4 rounded-sm'>

                    </div>
                    <div className='bg-green-500  grow h-4 rounded-sm'>

                    </div>
                    <div className='bg-widgetLight dark:bg-labelDark grow h-4 rounded-sm'>
                        
                    </div>
                </div>
            </div>
        </NextUIProvider>
  )
}

export default UserPickDay