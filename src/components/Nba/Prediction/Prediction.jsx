import { React, useEffect, useState } from 'react';
import PredictionStat from '@/components/Nba/PredictionStat/PredictionStat';
import Picker from '@/components/Picker/Picker';
import Prediction from '@/components/Prediction/Prediction';
import PredictionPoint from '../PredictionPoint/PredictionPoint';
import Image from 'next/image'
import Comment from '@/components/Comment/Comment';
import authCheck from '@/utils/authCheck';
import LoadingSpinner from '@/components/Loading/loading';
import fetchEventsData from '@/utils/eventsData';

const Pred = ({ id }) => {
  const [data, setData] = useState([]);
  const [role, setRole] = useState(); 
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchEventsData(id);

      if (!response.ok) {
        setLoading(false);
      }else{
        setData(response);
        setLoading(false);
        setError(null);
      }

      const respo = await authCheck();
      if(!respo){
          setAuth(false);
          setLoading(false);
      }else{
        setRole(respo.role);
        setAuth(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if(loading){
    return (
      <LoadingSpinner />
    )
  }

  if(auth){
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