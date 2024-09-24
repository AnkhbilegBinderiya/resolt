"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker, Input, Progress, Image, Tooltip } from "@nextui-org/react";
import { IoExitOutline } from "react-icons/io5";
import { useAuth } from '../../../context/AuthContext';
import { MdWavingHand } from "react-icons/md";
import { fetchUserId } from '../../../utils/fetchUserId'
import { GiMongolia } from "react-icons/gi";

const GuestProfile = ({name}) => {
    const [isPersonal, setIsPersonal] = useState(false);
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState('/assets/image/user/user1.png');
    const [error, setError] = useState(null);
    const { logout, token, authCheck } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:6969/user/data/name/${name}`);
            if (!response.ok) {
             throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result);
            setProfile(result.profile);
        } catch (error) {
            setData([]);
            setError(error.message);
        }
        };
        fetchData();
    }, [token, name]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const getDate = (dateString) => {
        const date1 = new Date();
        const date2 = new Date(dateString);
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
        const diffInMs = date2 - date1;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        return 30-diffInDays;
    };

    const handleLogout = () => {
        logout(); 
        window.location.href = `/`; 
    };

    const handleEdit= () => {
        setIsEdit(true);
    };

    return (
        <NextUIProvider>
            <div className='w-full flex flex-col gap-4'>
                <div className='w-full p-4 justify-between bg-white dark:bg-widgetDark rounded-lg'>
                    <div className='w-full flex justify-start gap-4 items-center'>
                        <div className='flex'>
                                <Image
                                        isBlurred
                                        width={128}
                                        alt="Profile Image"
                                        src={profile}
                                />
                        </div>
                        <div className='flex flex-col justify-center h-full gap-4'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                            <p className='text-lg font-semibold text-primary'>pro &gt;&gt;</p>
                                            <p className='text-secondary text-4xl font-semibold text-black dark:text-white'>{name}</p>
                                    </div>
                                </div>
                                <div className='flex justify-end ml-auto gap-4 mr-12'>
                                    <a className=" text-black bg-widgetLight dark:bg-white dark:text-black font-semibold py-2 px-6 rounded-md text-xs" href="/auth/login">
                                        Follow
                                    </a>
                                    <a className="text-black bg-widgetLight dark:bg-labelDark dark:text-white font-semibold py-2 px-6 rounded-md text-xs" href="/auth/login">
                                        Notfication
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-between gap-4'>
                    <div className='w-2/3 flex flex-col bg-white dark:bg-widgetDark rounded-lg p-4 gap-4'>
                        <div className='border-1 border-black/20 dark:bg-labelDark dark:border-transparent rounded-lg w-32 text-center'>
                            <p className='py-2'>Last Picks</p>
                        </div>
                        <div className='w-full'>
                            <div className='border-1 border-black/10 dark:border-white/50 w-full h-16 rounded-lg'>

                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col gap-2'>
                        <div className='w-full flex gap-2'>
                            <div className='w-full bg-white dark:bg-widgetDark rounded-lg p-4 flex flex-col gap-2 hover:shadow-md hover:shadow-white/40 duration-300 hover:scale-105'>
                                <p className='text-sm'>win rate</p>
                                <p className='text-2xl font-semibold'>67%</p>
                            </div>
                            <div className='w-full bg-white dark:bg-widgetDark rounded-lg p-4 flex flex-col gap-2 hover:shadow-md hover:shadow-white/40 duration-300 hover:scale-105'>
                                <p className='text-sm'>Picks</p>
                                <p className='text-2xl font-semibold'>689</p>
                            </div>
                        </div>
                        <div className='w-full bg-white dark:bg-widgetDark p-4 rounded-lg'>
                            <p>Favorite</p>
                        </div>
                    </div>
                </div>
            </div>
        </NextUIProvider>
  )
}

export default GuestProfile