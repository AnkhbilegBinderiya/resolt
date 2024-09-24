"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import ListItem from '../../components/listItem/ListItem';
import { NextUIProvider, DatePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { CiBasketball } from "react-icons/ci";
import { CiBaseball } from "react-icons/ci";
import { CiFootball } from "react-icons/ci";
import { PiSoccerBallThin } from "react-icons/pi";
import { PiHockeyThin } from "react-icons/pi";
import { PiVolleyballThin } from "react-icons/pi";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";



const leagues = [
  {
    league: "LALIGA",
    name: "LA LIGA",
    logo: "/assets/logo/flags/spain.png",
    icon: <PiSoccerBallThin size={24}/>
  },
  {
    league: "EPL",
    name: "EPL",
    logo: "/assets/logo/flags/spain.png",
    icon: <PiSoccerBallThin size={24}/>
  },
  {
    league: "NBA",
    name: "NBA",
    logo: "/assets/logo/flags/usa.png",
    icon: <CiBasketball size={24}/>
  },
  {
    league: "MLB",
    name: "MLB",
    logo: "/assets/logo/flags/usa.png",
    icon: <CiBaseball size={24}/>
  },
  {
    league: "VNL",
    name: "VNL",
    logo: "/assets/logo/flags/usa.png",
    icon: <PiVolleyballThin size={24}/>
  },
  {
    league: "NHL",
    name: "NHL",
    logo: "/assets/logo/flags/usa.png",
    icon: <PiHockeyThin size={24}/>
  }
];

const options = [
  {
    code: "ALL",
    name: "All",
  },
  {
    code: "READY",
    name: "Ready",
  },
  {
    code: "FINISHED",
    name: "Finished",
  },
];


const SportBookPage = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
  const [selectedLeague, setSelectedLeague] = useState("NBA");
  const [selectedOption, setSelectedOption] = useState("ALL");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const year = date.year;
      const month = String(date.month).padStart(2, '0');
      const day = String(date.day).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      try {
        const response = await fetch(`http://localhost:6969/books?league=${selectedLeague}&date=${formattedDate}&option=${selectedOption}`);
        if (!response.ok) {
          throw new Error(`No data found for ${selectedLeague} on ${formattedDate}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (error) {
        setData([]);
        setError(error.message);
      }
    };

    fetchData();
  }, [selectedLeague, date, selectedOption]);

  const pickLeague = (league) => {
    setSelectedLeague(league);
  };

  const pickOption = (option) => {
    setSelectedOption(option);
  };

  const minusDate = () => {
    const currentDate = new Date(date.year, date.month - 1, date.day);
    currentDate.setDate(currentDate.getDate() - 1);

    const newCalendarDate = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    setDate(newCalendarDate);
  };

  const plusDate = () => {
    const currentDate = new Date(date.year, date.month - 1, date.day);
    currentDate.setDate(currentDate.getDate() + 1);

    const newCalendarDate = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
    setDate(newCalendarDate);
  };

  return (
    <NextUIProvider>
      <div className='flex flex-col w-full z-30 pt-14'>
        <div className='w-full border-b-1 border-black/10 dark:border-white/10 justify-center '>
            <div className='flex w-full lg:w-2/4 mx-auto'>
              {leagues.map((league) => (
                <button
                  key={league.name}
                  onClick={() => pickLeague(league.league)}
                  className={`flex flex-col sm:flex-row gap-2 py-2 border-b-3 items-center justify-center w-full font-semibold text-xs duration-200 ${selectedLeague === league.league ? 'text-black dark:text-white border-black dark:border-white/50' : 'text-black/50 dark:text-white/50 border-transparent'}`}
                >
                  {league.icon}
                  {league.name}
                </button>
              ))}
            </div>
        </div>
        <div className='flex flex-row w-full'>
          <div className='hidden md:flex lg:w-1/4 mt-1'></div>
          <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col">
            <div className='flex md:hidden justify-start items-center gap-2 bg-white dark:bg-widgetDark py-4 pl-8'>
                    {options.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => pickOption(opt.code)}
                        className={`flex py-2 px-4 font-medium text-xs rounded-md ${selectedOption === opt.code ? 'bg-primary dark:bg-labelDark text-white border-1 border-primary dark:border-labelDark' : 'text-black dark:text-white border-1 border-black/10 dark:border-transparent'}`}
                      >
                        {opt.name}
                      </button>
                    ))}
            </div>
            <div className='bg-white dark:bg-widgetDark rounded-xl py-4 text-black dark:text-white border-1 border-white dark:border-white/10 '>

              <div className='flex justify-between items-center mb-4 md:px-8 px-4'>
                <div className='hidden md:flex justify-start items-center gap-2'>
                    {options.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => pickOption(opt.code)}
                        className={`flex py-2 px-4 font-medium text-xs rounded-md ${selectedOption === opt.code ? 'bg-primary dark:bg-labelDark text-white border-1 border-primary dark:border-labelDark' : 'text-black dark:text-white border-1 border-black/10 dark:border-transparent'}`}
                      >
                        {opt.name}
                      </button>
                    ))}
                </div>
                <div className='w-full flex md:justify-end justify-around items-center'>
                  <button onClick={() => minusDate()} className='flex items-center justify-center min-w-8 px-10 md:px-2 text-black/50 dark:text-white/50 hover:text-primary'>
                    <SlArrowLeft size={16}/>
                  </button>
                  <DatePicker
                    className='rounded-lg text-xs w-48'
                    value={date}
                    onChange={setDate}
                    variant="flat"
                    disableAnimation={false}
                    granularity="day"
                    size="sm"
                  />
                  <button onClick={() => plusDate()} className='flex items-center justify-center min-w-8 px-10 md:px-2 text-black/50 dark:text-white/50 hover:text-primary'>
                    <SlArrowRight size={16}/>
                  </button>
                </div>
              </div>
              {error ? (
                <div className="text-red-500 text-center py-4">{error}</div>
              ) : (
                <ul>
                  {data.length > 0 ? (
                    data.map((event) => (
                      <div className='flex flex-col w-full' key={event.id}>
                        <div className="w-full px-2">
                          <ListItem event={event} />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">No events found for the selected date and league.</div>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className='hidden md:flex lg:w-1/4 mt-1'></div>
          </div>
      </div>
    </NextUIProvider>
  );
};

export default SportBookPage;
