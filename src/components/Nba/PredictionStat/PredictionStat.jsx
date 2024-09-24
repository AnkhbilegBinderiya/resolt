"use client"

import { React, useEffect, useState } from 'react'
import StatLine from '@/components/StatLine/StatLine';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

const options = [
    {
      code: "1",
      name: "Quarter 1",
    },
    {
      code: "2",
      name: "Quarter 2",
    },
    {
      code: "3",
      name: "Quarter 3",
    },
    {
      code: "4",
      name: "Quarter 4",
    },
    {
      code: "0",
      name: "Match",
    },
];

const PredictionStat = ({id}) => {
    const [data, setData] = useState([]);
    const [homeData, setHomeData] = useState([]);
    const [awayData, setAwayData] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [quarter, setQuarter] = useState("0")
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

          try {
            const response = await fetch(`http://localhost:6969/prediction/nba/${id}?quarter=${quarter}`);
            if (!response.ok) {
              throw new Error(`No data found`);
            }
            const result = await response.json();
            
            setData(result)

            setHomeData(result[0]);
            setAwayData(result[1]);
        } catch (error) {
            console.log(error);;
        }

        };
        fetchData();
    }, [id, quarter]);

    const selectQuarter = (q) => {
        setQuarter(q);
    };

    return (
        <div className="flex flex-col w-full">
            <div className='w-full flex items-center pt-4 gap-1 md:gap-2 px-2 md:px-4'>
                    {options.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => selectQuarter(opt.code)}
                        className={`flex font-medium text-xs w-full justify-center rounded-md py-2 ${quarter === opt.code ? 'bg-primary text-white dark:bg-labelDark' : 'text-black bg-black/5 dark:text-white/50 dark:border-1 dark:border-white/10'}`}
                      >
                        {opt.name}
                      </button>
                    ))}
            </div>
            <div className='flex flex-col justify-around text-xs p-3 w-full '>
              <div className='text-center text-xs w-full my-2 py-2 font-semibold text-black dark:text-white bg-black/5 dark:bg-labelDark rounded-lg'>Points</div>
              <StatLine name="Field Goals Attempted" homeStat={homeData["FGA"]} awayStat={awayData["FGA"]}/>
              <StatLine name="Field Goals Made" homeStat={homeData["FGM"]} awayStat={awayData["FGM"]}/>
              <StatLine name="Field Goals %" homeStat={homeData["FGP"]} awayStat={awayData["FGP"]}/>
              <StatLine name="2-Point Field G. Attempted" homeStat={homeData["twoPA"]} awayStat={awayData["twoPA"]}/>
              <StatLine name="2-Point Field Goals Made" homeStat={homeData["twoPM"]} awayStat={awayData["twoPM"]}/>
              <StatLine name="2-Point Field Goals %" homeStat={homeData["twoPP"]} awayStat={awayData["twoPP"]}/>
              <StatLine name="3-Point Field G. Attempted" homeStat={homeData["threePA"]} awayStat={awayData["threePA"]}/>
              <StatLine name="3-Point Field Goals Made" homeStat={homeData["threePM"]} awayStat={awayData["threePM"]}/>
              <StatLine name="3-Point Field Goals %" homeStat={homeData["threePP"]} awayStat={awayData["threePP"]}/>
              <StatLine name="Free Throws Attempted" homeStat={homeData["FTA"]} awayStat={awayData["FTA"]}/>
              <StatLine name="Free Throws Made" homeStat={homeData["FTM"]} awayStat={awayData["FTM"]}/>
              <StatLine name="Free Throws %" homeStat={homeData["FTP"]} awayStat={awayData["FTP"]}/>
              <div className='text-center text-xs w-full my-2 py-2 font-semibold text-black dark:text-white bg-black/5 dark:bg-labelDark rounded-lg'>Rebounds</div>
              <StatLine name="Offensive Rebounds" homeStat={homeData["OREB"]} awayStat={awayData["OREB"]}/>
              <StatLine name="Defensive Rebounds" homeStat={homeData["DREB"]} awayStat={awayData["DREB"]}/>
              <StatLine name="Total Rebounds" homeStat={homeData["REB"]} awayStat={awayData["REB"]}/>
              <div className='text-center text-xs w-full my-2 py-2 font-semibold text-black dark:text-white bg-black/5 dark:bg-labelDark rounded-lg'>Other</div>
              <StatLine name="Assists" homeStat={homeData["AST"]} awayStat={awayData["AST"]}/>
              <StatLine name="Turnovers" homeStat={homeData["TOV"]} awayStat={awayData["TOV"]}/>
              <StatLine name="Steals" homeStat={homeData["STL"]} awayStat={awayData["STL"]}/>
              <StatLine name="Blocks" homeStat={homeData["BLK"]} awayStat={awayData["BLK"]}/>
              <StatLine name="Personal Fouls" homeStat={homeData["PF"]} awayStat={awayData["PF"]}/>
            </div>
        </div>
  )
}

export default PredictionStat