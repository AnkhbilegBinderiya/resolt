"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link";
import { toast } from 'react-toastify';

const Prediction = ({id}) => {
    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await authCheck();
            if(!data){
                setAuth(false);
            }else{
                setAuth(true);
            }

            if (auth) {
                try {
                    const response = await fetch(`http://localhost:6969/prediction/nba/main/${id}`);
                    if (!response.ok) {
                    throw new Error(`No data found`);
                    }
                    const result = await response.json();
                    setData(result)

                    if(result && result.status === 1){
                        setReady(true);
                    }else{
                        setReady(false);
                    }
                }catch(error){
                    console.log("failed");
                }
            }
        }
        fetchData();
    }, [id, auth]);

    return (
        <div className="w-full flex p-4 flex-col">
            <div className='w-full border-1 dark:border-white/10 rounded-lg p-4 gap-2'>
                <p className='font-semibold text-black dark:text-white text-left ml-4'>Prediction</p>
                {ready ? (
                    <div className='flex flex-col w-full'>
                        <div className='flex flex-col p-4 gap-1'>   
                            <p className='text-xs md:text-sm'>{data.desc}</p>
                            <div className='flex mt-6 items-center gap-2'>
                                <p className=' text-black/50 dark:text-white/50'>Selection&#32; &#58;</p>
                                <p className='font-semibold text-primary'>{data.option}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className=' text-black/50 dark:text-white/50'>Pick&#32; &#58;</p>
                                <p className='font-semibold'>{data.selection}</p>
                            </div>
                            <div className='flex items-center gap-2'>
                                <p className=' text-black/50 dark:text-white/50'>Odds&#32; &#58;</p>
                                <div className='flex bg-primary text-xs items-center px-3 py-1 rounded-md font-semibold'>
                                    {data.odds}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-4 rounded-lg w-full text-center flex justify-center gap-1">
                        <p className='text-sm text-black dark:text-white'>Sorry Main prediction isn&apos;t ready now</p>
                    </div>
                ) }
            </div>
        </div>
  )
}

export default Prediction