"use client"

import { React, useEffect, useState } from 'react'
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
// import Image from 'next/image'
import { Image } from "@nextui-org/react";

const ResultPoint = ({id, homeId, awayId}) => {
    const [data, setData] = useState([]);
    const [homeData, setHomeData] = useState([]);
    const [awayData, setAwayData] = useState([]);
    const [header, setHeader] = useState([]);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(`http://localhost:6969/result/nba/${id}?team=${homeId}`);
                if (!response1.ok) {
                    throw new Error('No data found');
                }
                const result1 = await response1.json();

                setHomeData(Array.isArray(result1) ? result1 : []);

                const response2 = await fetch(`http://localhost:6969/result/nba/${id}?team=${awayId}`);
                if (!response2.ok) {
                    throw new Error('No data found');
                }
                const result2 = await response2.json();

                setAwayData(Array.isArray(result2) ? result2 : []);

                const response = await fetch(`http://localhost:6969/events/${id}`);
                if (!response.ok) {
                  throw new Error(`No data found`);
                }
                const result = await response.json();
                setHeader(result)

            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id, homeId, awayId]);

    const getPointsByQuarter = (data, quarter) => {
        const quarterData = data.filter(item => item.quarter === quarter);
        return quarterData.length ? quarterData[0].PTS : '-';
    }

    const getBoldClass = (homeValue, awayValue) => {
        if (homeValue > awayValue) {
            return 'font-bold';
        } else if (homeValue < awayValue) {
            return 'text-black/50 dark:text-white/50';
        }
        return '';
    };

    return (
        <div className="flex flex-col w-full rounded-lg">
            <Table
            removeWrapper={false}
            isHeaderSticky={true}
            aria-label="Example static collection table"
            shadow="none"
            radius='sm'
            >
          <TableHeader className="bg-primary dark:bg-labelDark">
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-left w-full">Team</TableColumn>
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-center w-1/6">Q1</TableColumn>
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-center w-1/6">Q2</TableColumn>
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-center w-1/6">Q3</TableColumn>
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-center w-1/6 ">Q4</TableColumn>
            <TableColumn className="bg-black/5 text-black dark:text-white dark:bg-labelDark text-center w-1/6">Total</TableColumn>
          </TableHeader>
          <TableBody>
                    <TableRow key="home">
                        <TableCell className="flex gap-2 justify-start w-full"><Image width={24} height={24} src={header.home_team_logo} radius='none' alt={header.home_team_name}/> <p className='hidden sm:block md:hidden lg:block'>{header.home_team_name}</p></TableCell>
                        {['1', '2', '3', '4', '0'].map((quarter, index) => {
                            const homeValue = getPointsByQuarter(homeData, parseInt(quarter));
                            const awayValue = getPointsByQuarter(awayData, parseInt(quarter));
                            return (
                                <TableCell key={index} className={`text-xs text-center md:text-sm w-1/6 ${getBoldClass(homeValue, awayValue)}`}>
                                    {homeValue}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                    <TableRow key="away">
                        <TableCell className="flex gap-2 justify-start w-full"><Image width={24} height={24} src={header.away_team_logo} radius='none' alt={header.away_team_name}/> <p className='hidden sm:block md:hidden lg:block'>{header.away_team_name}</p></TableCell>
                        {['1', '2', '3', '4', '0'].map((quarter, index) => {
                            const homeValue = getPointsByQuarter(homeData, parseInt(quarter));
                            const awayValue = getPointsByQuarter(awayData, parseInt(quarter));
                            return (
                                <TableCell key={index} className={`text-xs text-center md:text-sm w-1/8 ${getBoldClass(awayValue, homeValue)}`}>
                                    {awayValue}
                                </TableCell>
                            );
                        })}
                    </TableRow>
            </TableBody>
        </Table>
        </div>
  )
}

export default ResultPoint