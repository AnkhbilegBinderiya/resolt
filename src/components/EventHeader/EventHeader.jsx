"use client"

import { React, useEffect, useState } from 'react'
// import Image from 'next/image'
import { Image } from "@nextui-org/react";


const EventHeader = ({header}) => {

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
    <div className='flex flex-row justify-around z-30 bg-white dark:bg-widgetDark'>
            <div className='flex flex-col w-1/4 items-center gap-4'>
                <Image width={56} height={56} radius='none' src={header.home_team_logo} alt={header.home_team_name}/>
                <p className='text-xs md:text-sm font-medium text-center'>{header.home_team_name}</p>
            </div>
            <div className='flex flex-col gap-4 justify-center items-center'>
                <p className='text-sm font-medium'>{formatDate(header.date)}</p>
                <div className="mix-blend-difference">
                  <a href="/" ><Image
                          src='/assets/image/Logo-white.png'
                          alt="ResoltX Logo"
                          width={120} 
                          height={50}
                          priority={true}
                          radius='none'
                          automatically="true" provided="true"
                          style={{ width: '100%', height: 'auto'}}
                  /></a>
                </div>
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
