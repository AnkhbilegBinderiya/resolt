"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker } from "@nextui-org/react";

import TeamHeader from '../../../../components/TeamHeader/TeamHeader'
import Games from '../../../../components/Nba/Games/Games';
import Standing from '../../../../components/Nba/Standing/Standing';

const option = [
    {
      name: "Standing",
      selection: "standing",
    },
    {
      name: "Games",
      selection: "games",
    },
    // {
    //   name: "Players",
    //   selection: "players",
    // },
    // {
    //   name: "News",
    //   selection: "news",
    // },
  ];

const TeamPage = ({params}) => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("games");
  const [header, setHeader] = useState("games");
  const [error, setError] = useState(null);

  const {slug} = params;

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await fetch(`http://localhost:6969/teams/${slug}/${selectedOption}`);
        if (!response.ok) {
          throw new Error(`No data found`);
        }
        const result = await response.json();
        setData(result);
        setHeader(result[0]);
        setError(null);
      } catch (error) {
        setData([]);
        setError(error.message);
      }

    };
    fetchData();
  }, [selectedOption, slug]);

  const pickOption = (option) => {
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'games':
        return <Games id={slug} name={header.name} />;
      case 'standing':
        return <Standing id={slug}/>;
      case 'value3':
        return <div>Condition 3 met</div>;
      default:
        return <div className="text-red-500 text-center py-4">{error}</div>;
    }
  };

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30 md:gap-4'>
        <div className='hidden md:flex lg:w-1/4 mt-1'></div>

        <div className="w-full lg:w-2/4 h-full mr-auto mt-16 mx-auto flex flex-col gap-4">
          <div className='flex flex-col w-full mt-2 bg-white rounded-xl pt-4'>

          <TeamHeader id={slug} />
            
            <div className='w-full border-y-1 mt-4'>
                <div className='flex pl-8 items-center'>
                {option.map((opt) => (
                    <button
                    key={opt.name}
                    onClick={() => pickOption(opt.selection)}
                    className={`flex flex-col gap-1 py-3 items-center border-b-3 justify-center px-1 mx-4 text-sm  duration-200 ${selectedOption === opt.selection ? ' text-black font-semibold border-black' : 'font-semibold text-black/60 border-transparent'}`}
                    >
                        {opt.name}
                    </button>
                ))}
                </div>
            </div>

            {renderContent()}

          </div>
        </div>

        <div className='hidden md:flex lg:w-1/4 mt-1'></div>
      </div>
    </NextUIProvider>
  );
};

export default TeamPage;
