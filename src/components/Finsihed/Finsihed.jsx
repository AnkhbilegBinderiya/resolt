"use client"

import { React, useEffect, useState } from 'react'

const Finished = ({ winner, league, event }) => {
    const [homeData, setHomeData] = useState([]);
    const [awayData, setAwayData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

          try {
            const response = await fetch(`http://localhost:6969/result/${league}/${event}?quarter=0`);
            if (!response.ok) {
              throw new Error(`No data found`);
            }
            const result = await response.json();
            setHomeData(result[0]);
            setAwayData(result[1]);
        } catch (error) {
            console.log(error);;
        }
        };
        fetchData();
    }, [event, league]);

    console.log()

    return (
        <div className="w-full flex flex-col gap-2 items-end">
            <div className="flex justify-between items-center">
               <p className={`${winner == 1 ? 'font-bold text-black dark:text-white' : 'font-normal text-black dark:text-white'}`}>{homeData.PTS}</p>
            </div>
            <div className="items-center flex justify-between">
                <p className={`${winner == 2 ? 'font-bold text-black dark:text-white' : 'font-normal text-black dark:text-white'}`}>{awayData.PTS}</p>
            </div>
        </div>
  )
}

export default Finished