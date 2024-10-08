import { React, useEffect, useState } from 'react';
import PredictionStat from '@/components/Nba/PredictionStat/PredictionStat';
import Picker from '@/components/Picker/Picker';
import Prediction from '@/components/Prediction/Prediction';
import PredictionPoint from '../PredictionPoint/PredictionPoint';
import { useAuth } from '../../../context/AuthContext';
import { fetchUserRole } from '../../../utils/fetchUserRole'
import Image from 'next/image'
import Comment from '@/components/Comment/Comment';

const Pred = ({ id }) => {
  const [data, setData] = useState([]);
  const { token } = useAuth();
  const [role, setRole] = useState(); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:6969/events/${id}`);
        if (!response.ok) {
          throw new Error(`No data found`);
        }
        const result = await response.json();
        setData(result);

        if(token){
          const fetchedRole = await fetchUserRole(token);
          setRole(fetchedRole);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchData();
  }, [id, token]);


  if(token){
    if (role == 1) {
      return (
        <div className="w-full flex flex-col">
          <div>
            <Prediction id={id} />
          </div>
          <div>
            <Picker id={id}/>
          </div>
          <div>
            <Comment id={id} />
          </div>
        </div>
      );
    }else if(role > 1){
      return (
        <div className="w-full flex flex-col">
            <div className="m-4">
                <PredictionPoint id={id} homeId={data.home_team_id} awayId={data.away_team_id} />
            </div>
            <div className='border-b-1'></div>
            <div>
              <PredictionStat id={id} />
            </div>
            <div>
              <Prediction id={id} />
            </div>
            <div>
              <Picker id={id}/>
            </div>
            <div>
              <Comment id={id}/>
            </div>
          </div>
      );
    }else{
      return(
        <div>
          <Picker id={id}/>
          <Comment id={id}/>
        </div>
      );
    }
  }else{
    return(
      <div>
        <Picker id={id}/>
        <Comment id={id}/>
      </div>
    );
  }
  

};

export default Pred;