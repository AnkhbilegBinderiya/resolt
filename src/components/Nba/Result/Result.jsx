import { React, useEffect, useState } from 'react';
import Picker from '@/components/Picker/Picker';
import Image from 'next/image'
import ResultStat from '../ResultStat/ResultStat';
import ResultPoint from '../ResultPoint/ResultPoint';

const Result = ({ id }) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6969/events/${id}`);
        if (!response.ok) {
          throw new Error(`No data found`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, [id]);

    return(
      <div className="w-full flex flex-col">
            <div className="m-4">
                <ResultPoint id={id} homeId={data.home_team_id} awayId={data.away_team_id} />
            </div>
            <div className='border-b-1'></div>
            <div>
                <ResultStat id={id} />
            </div>
        </div>
    );
};

export default Result;