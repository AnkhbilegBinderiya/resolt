"use client"

import { React, useEffect, useState } from 'react'
import { Image } from "@nextui-org/react";
import Link from "next/link";

const PickCard = ({data}) => {

    const href = data !== null ? `/event/${data.league_name.toLowerCase()}/${data.event_id}` : '#';

    const DateCalculate = (date) =>{
        const dateObject = new Date(date);
       
        const day = dateObject.getDate();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = dateObject.getMonth();
        const monthName = monthNames[monthIndex];

        const dayString = String(day).padStart(2, '0');
        const dateString = `${monthName}-${dayString}`;
        return dateString;
    }

    const YearCalculate = (date) =>{
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const yearString = String(year);
        return yearString;
    }

    const winLose = (result) => {
        if(result == 1){
            return "win";
        }else{
            return "lose";
        }
    };

    const pickedTeam = (result) => {
        if(result == 1){
            return data.home_team_name;
        }else{
            return data.away_team_name;
        }
    };

    return (
        <div className="flex flex-col items-center w-full p-4 my-2 border-1 gap-2 border-black/10 text-black text-xs dark:border-white/10 dark:text-white rounded-lg ">
            <Link className="w-full h-full flex justify-between py-1" href={href}>
                <div className="flex gap-2 text-xs items-center">
                    <div className="flex justify-between items-center">
                        <div className="items-center flex space-x-2 h-full">
                            <Image radius='none' width={18} height={18} src={data.home_team_logo} alt={data.home_team_name}/>
                            {/* <p>{data.home_team_name}</p> */}
                        </div>
                    </div>
                    <div>
                        <p>@</p>
                    </div>
                    <div className="items-center flex justify-between">
                        <div className="items-center flex space-x-2">
                            <Image radius='none' width={18} height={18} src={data.away_team_logo} alt={data.away_team_name}/>
                            {/* <p>{data.away_team_name}</p> */}
                        </div>
                    </div>
                </div>
                <div className="flex gap-1 ">
                    <p>{YearCalculate(data.date)}</p>
                    <p>{DateCalculate(data.date)}</p>
                </div>
            </Link>
            <div className="flex">
                <p className="text-xs">{data.description}</p>           
            </div>
            <div className="flex w-full items-center justify-between ">
                <div className='p-2 bg-widgetLight text-black rounded-md dark:bg-labelDark dark:text-white'>
                    <p>{pickedTeam(data.pick)}</p>
                </div>
                <p className={`text-xs md:text-sm ${data.result === 1 ? 'text-green-500' : 'text-red-500'}`}>{winLose(data.result)}</p>           
            </div>
        </div>
  )
}

export default PickCard