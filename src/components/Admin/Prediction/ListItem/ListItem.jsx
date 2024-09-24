import { PiStarFill } from "react-icons/pi";
import Image from 'next/image'
import Link from "next/link";

import { HiLightBulb  } from "react-icons/hi2";

const ListItem = ({event}) => {

    const dateObject = new Date(event.date);
    if(dateObject.getHours() == 24){
        dateObject.setHours(0);
    }
    const eventTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const ready = event.prediction ? true : false;
    const href = event.prediction !== null ? `/event/${event.league_name.toLowerCase()}/${event.id}` : '#';

    return (
        <div className="flex items-center w-full py-2 border-b border-black/5 text-black text-xs hover:bg-gray-50">
            <div className="w-full h-full flex py-1">
                <div className="flex flex-col font-medium items-center justify-center mx-8 md:w-12 w-8 gap-2">
                    <p>{eventTime}</p>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="items-center flex space-x-2 h-full">
                            <Image width={18} height={18} src={event.home_team_logo} alt={event.home_team_name}/>
                            <p className="font-medium">{event.home_team_name}</p>
                        </div>
                    </div>
                    <div className="items-center flex justify-between">
                        <div className="items-center flex space-x-2">
                            <Image width={18} height={18} src={event.away_team_logo} alt={event.away_team_name}/>
                            <p className="font-medium">{event.away_team_name}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-full mx-8 items-center justify-center">
                {ready ? (
                        <Link className="bg-green-500 px-2 py-1 rounded-xl font-semibold" href={href}>
                            Prediction Ready
                        </Link>
                    ): (
                        <Link className="bg-red-600 px-2 py-1 rounded-xl font-semibold" href={href}>
                            Prediction Not Ready
                        </Link>
                    )
                }            
            </div>
        </div>
  )
}

export default ListItem