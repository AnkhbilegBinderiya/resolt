"use client"

import { React, useEffect, useState } from 'react'
import { PiStarFill } from "react-icons/pi";
import Image from 'next/image'

const TeamHeader = ({id}) => {
  const [header, setHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:6969/teams/${id}`);
        if (!response.ok) {
          throw new Error(`No data found`);
        }
        const result = await response.json();
        setHeader(result)
      } catch (error) {
        console.log(error);;
      }

    };
    fetchData();
  }, [id]);


  return (
    <div className='flex w-full items-center gap-4 md:gap-12 pl-12 my-6'>
                <a  href="/"><Image
                        src={header.logo}
                        alt="ResoltX Logo"
                        width={80} 
                        height={80}
                        priority={true}
                        automatically="true" provided="true"
                        style={{ width: '100%', height: 'auto' }}
                /></a>
                <div className='w-full flex flex-col gap-1 md:gap-2 ext-black'>
                    <p className='text-xl font-bold'>{header.name}</p>
                    <div className='flex gap-2'>
                        <p className='text-sm font-semibold'>{header.league_name}</p>
                        <p className='text-sm font-semibold'>/</p>
                        <p className='text-sm font-semibold'>{header.conference}</p>
                        <p className='text-sm font-semibold'>/</p>
                        <p className='text-sm font-semibold'>{header.division}</p>
                    </div>
                    <p className='text-sm font-medium'>Stadium: {header.Stadium}</p>
                </div>
      </div>
  );
};

export default TeamHeader;
