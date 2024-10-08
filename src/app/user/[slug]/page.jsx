"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { NextUIProvider, DatePicker, Input } from "@nextui-org/react";
import { IoMail, IoCalendar , IoDiamond , IoHeart , IoPencil  } from "react-icons/io5";
import UserProfile from '@/components/User/UserProfile/UserProfile';
import GuestProfile from '@/components/User/GuestProfile/GuestProfile';
import { authCheck } from '@/utils/authCheck'
import LoadingSpinner from '@/components/Loading/loading';

const UserPage = ({params}) => {
  const {slug} = params;
  const [ presonal, setPersonal ] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const user = await authCheck();
      if(!user){
        setPersonal(false);
        console.log(user)
      }else{
        if(user.username == slug){
          setPersonal(true);
        }else{
          setPersonal(false);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30'>
        <div className='hidden md:flex lg:w-1/4 mt-1'></div>

        <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col ">
          <div className='flex flex-col w-full mt-16 rounded-xl gap-4 p-4'>
              {presonal ? (
                              <UserProfile name={slug}/>
                          ) : (
                              <GuestProfile name={slug}/>
                          )
              }
          </div>
        </div>

        <div className='hidden md:flex lg:w-1/4 mt-1'></div>
      </div>
    </NextUIProvider>
  );
};

export default UserPage;
