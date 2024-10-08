"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker, Input, Progress, Image, Tooltip } from "@nextui-org/react";
import { IoExitOutline } from "react-icons/io5";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext'
import UserPick from '../UserPicks/UserPicks';
import UserBalance from '../UserBalance/UserBalance';
import { BsGear } from "react-icons/bs";
import fetchUserData from '@/utils/userData';
import LoadingSpinner from '@/components/Loading/loading';
import NotFoundScreen from '@/components/NotFound/notFound'

const UserProfile = ({name}) => {
    const [isPersonal, setIsPersonal] = useState(false);
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState('/assets/image/user/user1.png');
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const router = useRouter()
    const { removeToken } = useAuth()
    const href = `/user/profile?user=${name}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchUserData(name);
            if (!response) {
                setLoading(false);
                setNotFound(true);
            }else{
                setData(response);
                setProfile(response.profile);
                setLoading(false)
            }
        };
        fetchData();
    }, [name]);

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
    
        // Resetting time components to 00:00:00 to get accurate day difference
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);
    
        // Calculate the difference in milliseconds
        const diffInMs = date2 - date1;
    
        // Convert milliseconds to days
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    
        return 30-diffInDays;
    };

    const handleLogout = () => {
        removeToken();
        window.location.href = `/`;
    };

    const handleEdit= () => {
        setIsEdit(true);
    };

    if (loading) {
        return (
          <LoadingSpinner/>
        )
    }

    if (notFound) {
        return (
            <NotFoundScreen/>
        );
    }

    return (
        <NextUIProvider>
            <div className='w-full'>
                <div className='w-full flex p-4 justify-between bg-white dark:bg-widgetDark rounded-lg'>
                    <div className='w-full flex justify-start gap-4 items-center'>
                        <div className='flex'>
                                <Tooltip content="Change">
                                    <a href={href}>
                                        {profile && (
                                            <Image
                                                isZoomed
                                                isBlurred
                                                width={128}
                                                alt="Profile Image"
                                                src={profile}
                                            />
                                        )}
                                    </a>
                                </Tooltip>
                        </div>
                        <div className='flex flex-col justify-center h-full gap-4'>
                                <div className='w-full flex flex-col gap-2'>
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-xs font-semibold text-black/20 dark:text-white/20'>id: {data.id}</p>
                                        <p className='text-secondary text-4xl font-semibold text-black dark:text-white'>{name}</p>
                                    </div>
                                </div>
                                <div className='flex justify-end ml-auto gap-4 mr-12'>
                                    <a className=" text-black bg-widgetLight dark:bg-white dark:text-black font-semibold py-2 px-6 rounded-md text-xs flex items-center gap-2" href={`/user/edit?u=${name}`}>
                                            Edit
                                            <BsGear/>
                                    </a>
                                    <button className='py-2 px-6 text-xs font-semibold rounded-md bg-red-500 text-white duration-300 items-center gap-2 flex' onClick={handleLogout}>
                                            Logout
                                        <IoExitOutline />
                                    </button>
                                </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-4'>
                    <div className='w-full flex gap-2 mt-4 flex-col rounded-lg px-4 py-4 text-xs md:text-sm bg-white dark:bg-widgetDark'>
                    {data.plan_id == null  ? (
                        <>
                            <div className='flex gap-1 items-center px-2'>
                                <p>You are using free plan now check from another plans right now.</p>
                                <a href={`/user/plan?name=${data.username}`} className='text-primary underline'>Click here</a>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <p className='text-black dark:text-white font-semibold px-2'>{data.plan_name}</p>
                                    <div className='flex items-center bg-primary dark:bg-labelDark py-1 px-3 rounded-lg text-xs'>
                                        <p className='text-black dark:text-white'>{30 - getDate(data.plan_end) > 0 ? 30 - getDate(data.plan_end) : "0"}</p>
                                        <p className='text-black dark:text-white px-0.5'>days left</p>
                                    </div>
                                </div>
                                <div className='px-2'>
                                    <a href="/user/plan" className='text-primary underline'>change</a>
                                </div>
                            </div>
                            <div className='flex justify-between px-2'>
                                <p>{formatDate(data.plan_start)}</p>
                                <p>{formatDate(data.plan_end)}</p>
                            </div>
                            <div className='flex items-center px-2 mb-3'>
                                <Progress size="sm" aria-label="Loading..." value={getDate(data.plan_end)} maxValue={30} />
                            </div>
                        </>
                    )}
                    </div>
                    <div className='w-full flex justify-between gap-4'>
                    <div className='w-2/3 flex flex-col bg-white dark:bg-widgetDark rounded-lg p-4 gap-4'>
                        <div className='border-1 border-black/20 dark:bg-labelDark dark:border-transparent rounded-lg w-24 text-center'>
                            <p className='py-2 text-xs'>Last Picks</p>
                        </div>
                        <div className='w-full'>
                            <div className='w-full rounded-lg'>
                               <UserPick id={data.id}/>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/3 flex flex-col gap-2'>
                        <div className='w-full flex gap-2'>
                            <div className='w-full bg-white dark:bg-widgetDark rounded-lg p-4 flex flex-col gap-2 hover:shadow-md hover:shadow-white/40 duration-300 hover:scale-105'>
                                <p className='text-xs'>win rate</p>
                                <p className='text-2xl font-semibold'>67%</p>
                            </div>
                            <div className='w-full bg-white dark:bg-widgetDark rounded-lg p-4 flex flex-col gap-2 hover:shadow-md hover:shadow-white/40 duration-300 hover:scale-105'>
                                <p className='text-xs'>Picks</p>
                                <p className='text-2xl font-semibold'>689</p>
                            </div>
                        </div>
                        <div className='w-full bg-white dark:bg-widgetDark p-4 rounded-lg flex flex-col gap-2'>
                            <p className='text-xs'>Your balance</p>
                            <UserBalance id={data.id}/>
                        </div>
                    </div>
                </div>
                    
                </div>
            </div>
        </NextUIProvider>
  )
}

export default UserProfile