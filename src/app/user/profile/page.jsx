"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, RadioGroup, Radio, Image } from "@nextui-org/react";
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';
import fetchUserData from '@/utils/userData';
import LoadingSpinner from '@/components/Loading/loading';

const avatar = [
    {key: "1", label: "/assets/image/user/user1.png"},
    {key: "2", label: "/assets/image/user/user2.png"},
    {key: "3", label: "/assets/image/user/user3.png"},
    {key: "4", label: "/assets/image/user/user4.png"},
    {key: "5", label: "/assets/image/user/user5.png"},
    {key: "6", label: "/assets/image/user/user6.png"},
    {key: "7", label: "/assets/image/user/user7.png"},
    {key: "8", label: "/assets/image/user/user8.png"},
    {key: "9", label: "/assets/image/user/user9.png"},
    {key: "10", label: "/assets/image/user/user10.png"},
    {key: "11", label: "/assets/image/user/user11.png"},
    {key: "12", label: "/assets/image/user/user12.png"},
  ];

const UserProfile = () => {
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState();
    const [proKey, setProKey] = useState();
    const [loading, setLoading] = useState(true);

    const searchParams = useSearchParams();
    const username = searchParams.get('user');

    useEffect(() => {
        const fetchData = async () => {
          if(username != null){
            const response = await fetchUserData(username);
            if (!response) {
              window.location.href="/auth/login"
            }else{
              setData(response);
              setProfile(response.profile);
              setUser(response.id);
              setLoading(false);
            }
          }
        };
        fetchData();
    }, [username]);

    if(loading){
      return(
        <LoadingSpinner/>
      )
    }

    const save = async () => {
        if (!profile ||  !user) {
            toast.error("Something went wrong!", {position: 'top-left'});
            return;
        }

        const payload = {
            id: data.id,
            rsc: profile,
        };

        try {
            // Send the POST request
            const response = await fetch("http://localhost:6969/user/image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
    
            if (response.ok) {
              // Handle successful response
              const data = await response.json();
              window.location.href = `/user/${username}`; 
            } else {
              // Handle error response
              const errorData = await response.json();
              toast.error(`${errorData.message}`, {position: 'top-center'});
            }
          } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
          }
    };

    const clickImage = (imageKey) => {
        const selectedAvatar = avatar.find(pro => pro.key === imageKey);

        if (selectedAvatar) {
        setProfile(selectedAvatar.label);
        }

        setProKey(imageKey)
    };

    return (
        <NextUIProvider>
          <div className='flex flex-row w-full z-30'>
            <div className='hidden md:flex lg:w-1/4 mt-1'></div>
    
            <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col">
              <div className='flex flex-col md:flex-row w-full mt-16 bg-white dark:bg-widgetDark rounded-xl gap-4 p-4'>
                <div className='flex flex-row w-1/2 justify-center items-center gap-2'>
                  <Image width={124} src={profile} alt={data.username}/>
                  <p className='text-xl font-semibold'>{data.username}</p>
                </div>
                <div className='flex flex-col gap-2'>
                  <p>Select your profile picture</p>
                  <div className='grid w-full grid-cols-3 justify-center md:gap-4 gap-2'>
                    {avatar.map((pro) => (
                      <button 
                        key={pro.key} 
                        className={`flex justify-center`} 
                        onClick={() => clickImage(pro.key)}
                      >
                        <Image width={124} src={pro.label} alt={pro.key} className={`border-2 ${pro.key === proKey ? 'border-primary scale-105' : ''}`} />
                      </button>
                    ))}
                  </div>
                  <button className='bg-primary py-2 px-3 rounded-lg font-medium' onClick={() => save()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
    
            <div className='hidden md:flex lg:w-1/4 mt-1'></div>
          </div>
        </NextUIProvider>
      );
};

const UserProfilePage = () => (
  <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
  </Suspense>
);

export default UserProfilePage;
