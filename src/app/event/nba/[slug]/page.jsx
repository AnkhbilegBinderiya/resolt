"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import { NextUIProvider, DatePicker } from "@nextui-org/react";

import EventHeader from '@/components/EventHeader/EventHeader'
import Games from '@/components/Nba/Games/Games';
import StandingMultiply from '@/components/Nba/StandingMultiply/StandingMultiply';
import Pred from '@/components/Nba/Prediction/Prediction';
import Result from '@/components/Nba/Result/Result';
import LoadingSpinner from '@/components/Loading/loading';
import NotFoundScreen from '@/components/NotFound/notFound';
import fetchEventsData from '@/utils/eventsData';

const selection = [
    {
      name: "Prediction",
      selection: "prediction",
    },
    {
      name: "Result",
      selection: "result",
    },
    {
      name: "H2H",
      selection: "headtohead",
    },
    {
      name: "Standing",
      selection: "standing",
    },
];

const TeamPage = ({params}) => {
  const [data, setData] = useState([]);
  const [selectedSelection, setSelectedSelection] = useState("prediction");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);

  const {slug} = params;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEventsData(slug);

      if (!response.ok) {
        setLoading(false);
      }else{
        setData(response);
        setStatus(response.status != null ? true : false);
        setLoading(false);
        setError(null);
      }
    };
    fetchData();
  }, [slug]);

  const pickSelection = (selection) => {
    setSelectedSelection(selection);
  };


  const renderContent = () => {
    switch (selectedSelection) {
      case 'prediction':
        return <Pred id={slug}/>;
      case 'result':
        return status ? <Result id={slug}/> : <div className='text-center my-4'>Sorry match result isn&apos;t ready now</div>
      case 'headtohead':
        return  <div className='flex flex-col gap2'>
                  <Games id={data.home_team_id} name={data.home_team_name}/> 
                  <Games id={data.away_team_id} name={data.away_team_name}/> 
                </div>;
      case 'standing':
        return <StandingMultiply id1={data.home_team_id} id2={data.away_team_id} />;
      default:
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }
  };

  if(loading){
    return (
      <LoadingSpinner/>
    )
  }

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30 md:gap-4'>
        <div className='hidden md:flex md:w-1/4 mt-16'>
        
        </div>
        <div className="w-full md:w-2/4 h-full mr-auto mt-16 mx-auto flex flex-col gap-4">
          <div className='flex flex-col w-full mt-2 bg-white dark:bg-widgetDark rounded-xl py-4 text-black dark:text-white dark:border dark:border-white/10'>

          <EventHeader id={slug} />
            
            <div className='w-full border-y-1 border-black/10 dark:border-white/10 mt-4'>
                <div className='flex pl-2 items-center'>
                {selection.map((slct) => (
                    <button
                    key={slct.name}
                    onClick={() => pickSelection(slct.selection)}
                    className={`flex flex-col gap-1 py-3 items-center border-b-3 justify-center px-1 mx-4 text-sm  duration-200 ${selectedSelection === slct.selection ? ' text-black dark:text-white font-semibold border-black dark:border-white' : 'font-semibold text-black/60 dark:text-white/60 border-transparent'}`}
                    >
                        {slct.name}
                    </button>
                ))}
                </div>
            </div>


            {renderContent()}

          </div>
        </div>
        <div className='hidden md:flex md:w-1/4 mt-16'></div>
      </div>
    </NextUIProvider>
  );
};

export default TeamPage;
