"use client"

import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import ListItem from '../../components/listItem/ListItem';
import { NextUIProvider, DatePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import GridCard from '@/components/GridCard/GridCard';



const SpecailPage = () => {
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
        const response = await fetch(`http://localhost:6969/books?league=&date=2024-04-15&option=ALL`);
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

  return (
    <NextUIProvider>
      <div className='flex flex-col w-full z-30 pt-14'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4'>
            {data.length > 0 ? (
                data.map((event) => (
                    <div className='flex flex-col' key={event.id}>
                        <GridCard event={event} />
                    </div>
                ))
            ) : (
                <div className="text-center col-span-full py-4">No events found for the selected date and league.</div>
            )}
        </div>
      </div>
    </NextUIProvider>
  );
};

export default SpecailPage;
