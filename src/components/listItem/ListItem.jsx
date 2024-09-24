import { PiStarFill } from "react-icons/pi";
import {Image} from "@nextui-org/image";
import Link from "next/link";
import { button } from "@nextui-org/react";

import { HiLightBulb  } from "react-icons/hi2";
import Finished from "../Finsihed/Finsihed";

const ListItem = ({event}) => {

    const dateObject = new Date(event.date);
    if(dateObject.getHours() == 24){
        dateObject.setHours(0);
    }
    const eventTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    const ready = event.prediction ? true : false;
    const href =  `/event/${event.league_name.toLowerCase()}/${event.id}`;
    const finished = event.status !== null ? true : false;
    const winner = event.win !== null ? event.win : null;

    console.log(event.win)

    return (
        <div className="flex items-center w-full py-2 border-b border-black/5 text-black dark:text-white text-xs hover:bg-gray-50 dark:hover:bg-black/20">
            <Link className="w-full h-full flex py-1" href={href}>
                <div className="flex flex-col font-medium items-center justify-center mx-8 md:w-12 w-8 gap-2">
                    <p>{eventTime}</p>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <div className="items-center flex space-x-2 h-full">
                            <Image width={18} height={18} radius='none' src={event.home_team_logo} alt={event.home_team_name}/>
                            <p className={`text-black dark:text-white ${winner == 1 ? 'font-bold' : 'font-normal'}`}>{event.home_team_name}</p>
                        </div>
                    </div>
                    <div className="items-center flex justify-between">
                        <div className="items-center flex space-x-2">
                            <Image width={18} height={18} radius='none' src={event.away_team_logo} alt={event.away_team_name}/>
                            <p className={`text-black dark:text-white ${winner == 2 ? 'font-bold' : 'font-normal'}`}>{event.away_team_name}</p>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="flex mx-8 items-center justify-center">
                {finished ? (
                    <Finished winner={event.win} event={event.id} league={event.league_name}/>
                ) : (
                    ready ? (
                        <HiLightBulb size={24} color="#EEB500" />
                    ) : (
                        <HiLightBulb size={24} className="text-[#D8D8D8] dark:text-labelDark" />
                    )
                )}
            </div>
        </div>
  )
}

export default ListItem