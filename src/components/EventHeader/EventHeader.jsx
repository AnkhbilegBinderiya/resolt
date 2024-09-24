"use client"

import { React, useEffect, useState } from 'react'
// import Image from 'next/image'
import { Image } from "@nextui-org/react";


const EventHeader = ({id}) => {
  const [header, setHeader] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:6969/events/${id}`);
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

  function formatDate(inputDate) {
    const date = new Date(inputDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  return (
    <div className='flex flex-row justify-around z-30'>
            <div className='flex flex-col w-1/4 items-center gap-4'>
                <Image width={56} height={56} radius='none' src={header.home_team_logo} alt={header.home_team_name}/>
                <p className='text-xs md:text-sm font-medium text-center'>{header.home_team_name}</p>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <p className='text-sm font-medium'>{formatDate(header.date)}</p>
                <a href="/"><Image
                      radius='none'
                      src="/assets/image/Logo-black.png"
                      alt="ResoltX Logo"
                      width={100} 
                      height={30}
                /></a>
                <p className='text-xs md:text-sm font-medium text-black/50 dark:text-white/50'>{header.arena}</p>
            </div>
            <div className='flex flex-col w-1/4 items-center gap-4'>
                <Image width={56} height={56} radius='none'  src={header.away_team_logo} alt={header.away_team_name}/>
                <p className='text-xs md:text-sm font-medium text-center'>{header.away_team_name}</p>
            </div>
      </div>
  );
};

export default EventHeader;
