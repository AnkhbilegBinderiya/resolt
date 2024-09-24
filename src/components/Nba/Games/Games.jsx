"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link";

const Games = ({id, name}) => {
    const [data, setData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [selectedOption, setSelectedOption] = useState("OVERALL");

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/games/nba/${id}`);
            if (!response.ok) {
            throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result)
        } catch (error) {
            console.log(error);;
        }

        };
        fetchData();
    }, [id]);

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

    const handleShowMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
    };
    
    const href = "/";

    return (
        <div className="w-full flex flex-col">
            <div className='w-full px-3 mt-3'>
                <div className='bg-black dark:bg-labelDark py-3 w-full text-white px-8 rounded-lg text-xs flex font-semibold'>
                    <p className='mx-1'>{name}</p> 
                    <p className='text-white/60 dark:text-white/60'>Last matches</p>
                </div>
            </div>
            {(showAll ? data : data.slice(0, 5)).map((event) => (
                    <div className='flex flex-col w-full' key={event.id}>
                        <div className="w-full px-2">
                            <div className="flex items-center w-full py-2 border-b border-black/5 dark:border-white/5 text-xs hover:bg-gray-50 dark:hover:bg-black/10">
                                <Link className="w-full h-full flex py-1" href={href}>
                                    <div className="flex flex-col font-medium items-center justify-center mx-4 w-24">
                                        <p>{YearCalculate(event.date)}</p>
                                        <p>{DateCalculate(event.date)}</p>
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <div className="flex justify-between items-center">
                                            <div className="items-center flex space-x-2 h-full">
                                                <Image width={18} height={18} src={event.home_team_logo} alt={event.home_team_name}/>
                                                <p className="font-medium">{event.home_team_name}</p>
                                            </div>
                                        </div>
                                        <div className="items-center flex justify-between">
                                            <div className="items-center flex space-x-2">
                                                <Image width={18} height={18} src={event.away_team_logo} alt={event.away_team_name}/>
                                                <p className="font-medium">{event.away_team_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex mx-8 items-center justify-center">
                                    <p>Finished</p>   
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* <div className='text-xs w-full justify-center'> */}
                {!showAll && (
                    <button className='text-xs py-4 font-medium' onClick={handleShowMore}>Show More</button>
                )}
                {showAll && (
                    <button className='text-xs py-4 font-medium' onClick={handleShowLess}>Show Less</button>
                )}
            {/* </div> */}
        </div>
  )
}

export default Games