"use client"

import { React, useEffect, useState, useCallback  } from 'react'
import Image from 'next/image'
import ListItem from '../ListItem/ListItem';
import { NextUIProvider, DatePicker, Input, Textarea } from "@nextui-org/react";
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
import { toast } from 'react-toastify';

import { CiSearch } from "react-icons/ci";
import EventHeader from '@/components/EventHeader/EventHeader';

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
      name: "ALL",
    },
    {
      code: "READY",
      name: "Ready prediction",
    },
    {
      code: "NOT",
      name: "Not Ready",
    },
];

const PredictionHeader = () => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState(new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
    const [selectedLeague, setSelectedLeague] = useState("NBA");
    const [selectedOption, setSelectedOption] = useState("ALL");
    const [error, setError] = useState();
    const [editor, setEditor] = useState(false);
    const [eventId, setEventId] = useState(null);
    const [homeTeamId, setHomeTeamId] = useState(null);
    const [awayTeamId, setAwayTeamId] = useState(null);
    const [descEng, setDescEng] = useState(null);
    const [descMn, setDescMn] = useState(null);
    const [option, setOption] = useState(null);
    const [selection, setSelection] = useState(null);
    const [odds, setOdds] = useState(null);
    const [status, setStatus] = useState(1);
    const [type, setType] = useState(0);

    const fetchData = useCallback(async () => {
      const year = date.year;
      const month = String(date.month).padStart(2, '0');
      const day = String(date.day).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      try {
          const response = await fetch(`http://localhost:6969/admin/events/prediction?league=${selectedLeague}&date=${formattedDate}&option=${selectedOption}`);
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
  }, [selectedLeague, date, selectedOption]);

  useEffect(() => {
      fetchData();
  }, [fetchData]); 

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

    const valueSetter = (id, homeId, awayId) =>{
        setEventId(id);
        setHomeTeamId(homeId);
        setAwayTeamId(awayId);
        setEditor(true);
    }

    const savePrediction = async () => {

        if (!desc || !selection || !option || !odds ) {
            toast.warning("Sorry fill all :(", {position: 'top-left'});
            return;
        }

        const oddsStr = odds.toString();

        const formatRegex = /^\d+(\.\d{1,2})?$/;

        if (isNaN(odds) || !formatRegex.test(oddsStr)) {
            toast.warning("Sorry, please enter a valid number with up to two decimal places :(", { position: 'top-left' });
            return;
        }

        const payload = {
            eventId : eventId,
            homeTeamId : homeTeamId,
            awayTeamId : awayTeamId,
            desc : desc,
            option : option,
            selection : selection,
            odds: odds,
            status : status,
            type : type,
        };
  
        try {
          // Send the POST request
          const response = await fetch("http://localhost:6969/admin/events/prediction", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
  
          if (response.ok) {
            const data = await response.json();
  
            const { message } = data;
            toast.success(`Success`, {position: 'top-center'});
            setEditor(false)
            fetchData();
          } else {
            // Handle error response
            const errorData = await response.json();
            toast.error(`${errorData.message}`, {position: 'top-center'});
          }
        } catch (error) {
          alert(`An error occurred: ${error.message}`);
        }
      }

    if(editor){
        return (
          <NextUIProvider>
            <div className="w-full flex flex-col gap-4 mt-12">
              <EventHeader id={eventId}/>
              <Textarea
                    label="Description / English /"
                    labelPlacement="outside"
                    placeholder="Enter your prediction description"
                    variant="bordered"
                    size="md"
                    value={descEng}
                    onChange={(e) => setDescEng(e.target.value)}
                    aria-label="resoltx"
              />
              <Textarea
                    label="Description / Mongolia /"
                    labelPlacement="outside"
                    placeholder="Enter your prediction description"
                    variant="bordered"
                    size="md"
                    value={descMn}
                    onChange={(e) => setDescMn(e.target.value)}
                    aria-label="resoltx"
              />
              <Input
                    label="Option / Including Overtime /"
                    labelPlacement="outside"
                    placeholder="Enter your option"
                    variant="bordered"
                    size="md"
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                    aria-label="resoltx"
              />
              <Input
                    label="Selection / New York Wins /"
                    labelPlacement="outside"
                    placeholder="Enter your selection"
                    variant="bordered"
                    size="md"
                    value={selection}
                    onChange={(e) => setSelection(e.target.value)}
                    aria-label="resoltx"
              />
              <Input
                    label="Odds / 2.16 /"
                    labelPlacement="outside"
                    placeholder="X.XX"
                    variant="bordered"
                    size="md"
                    value={odds}
                    onChange={(e) => setOdds(e.target.value)}
                    aria-label="resoltx"
              />
              <Input
                    label="status"
                    labelPlacement="outside"
                    placeholder="1"
                    variant="bordered"
                    size="md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    aria-label="resoltx"
              />
              <Input
                    label="type"
                    labelPlacement="outside"
                    placeholder="--------"
                    variant="bordered"
                    size="md"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    aria-label="resoltx"
              />
              <button onClick={() => savePrediction()} className="bg-blue-700 text-white py-2 px-4 rounded-lg">
                Save
              </button>
            </div>
          </NextUIProvider>
        )
      }else{
    return (
        <NextUIProvider>
            <div className='flex w-full flex-col mt-6 gap-6'>
                <div className='flex w-full lg:w-2/4 mr-auto'>
                    {leagues.map((league) => (
                        <button
                        key={league.name}
                        onClick={() => pickLeague(league.league)}
                        className={`flex flex-col sm:flex-row mx-1 py-2 px-4 border border-black dark:border-white/20 rounded-lg items-center justify-center font-semibold text-[10px] duration-200 ${selectedLeague === league.league ? 'text-white bg-black dark:bg-white dark:text-black' : 'text-black dark:text-white/50'}`}
                        >
                        {league.icon}
                        {league.name}
                        </button>
                    ))}
                </div>
                <div className='w-full flex md:justify-start justify-around items-center'>
                    <button onClick={() => minusDate()} className='flex items-center justify-center min-w-8 px-10 md:px-2 text-black/50 hover:text-primary'>
                        <SlArrowLeft size={16} className='text-black dark:text-white'/>
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
                    <button onClick={() => plusDate()} className='flex items-center justify-center min-w-8 px-10 md:px-2 text-black/50 hover:text-primary'>
                        <SlArrowRight size={16} className='text-black dark:text-white'/>
                    </button>
                </div>
                <div className='flex justify-start items-center gap-2'>
                        {options.map((opt) => (
                        <button
                            key={opt.code}
                            onClick={() => pickOption(opt.code)}
                            className={`flex py-2 px-4 font-medium text-xs rounded-md ${selectedOption === opt.code ? 'bg-primary text-white dark:text-black border-1 border-primary' : 'text-black dark:text-white border-1 border-black/10 dark:border-white/20'}`}
                        >
                            {opt.name}
                        </button>
                        ))}
                </div>
                <div className='flex w-full h-screen'>
                {error ? (
                    <div className="text-red-500 text-center py-4">{error}</div>
                    ) : (
                        <ul className='w-full'>
                        {data.length > 0 ? (
                            data.map((event) => (
                            <div className='flex flex-col w-full' key={event.id}>
                                <div className="w-full flex px-2 items-center">
                                    <ListItem event={event} />
                                    <button onClick={() => valueSetter(event.id, event.home_team_id, event.away_team_id)} className="bg-primary px-6 h-8 rounded-md font-semibold">Edit</button>
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
        </NextUIProvider>
        )
    }
}

export default PredictionHeader