import { PiStarFill } from "react-icons/pi";
import Link from "next/link";
import { button } from "@nextui-org/react";
import {Image} from "@nextui-org/image";

import { HiLightBulb  } from "react-icons/hi2";

const GridCard = ({event}) => {

    const dateObject = new Date(event.date);
    if(dateObject.getHours() == 24){
        dateObject.setHours(0);
    }

    const DateCalculate = (date) =>{
        const dateObject = new Date(date);
       
        const day = dateObject.getDate();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = dateObject.getMonth();
        const monthName = monthNames[monthIndex];

        const dayString = String(day).padStart(2, '0');
        const dateString = `${monthName} ${dayString}`;
        return dateString;
    }

    const YearCalculate = (date) =>{
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const yearString = String(year);
        return yearString;
    }

    return (
        <div className="flex items-center w-full rounded-xl bg-white text-black p-4 hover:bg-black/5 duration-250">
            <Link className="w-full h-full flex flex-col py-1 gap-8" href="/">
                <div className="flex font-medium items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Image
                            width={24}
                            height={16}
                            alt="NextUI hero Image"
                            src={event.league_logo}
                            radius="none"
                        />
                        <p className="text-xs">{event.league_name}</p>
                    </div>
                    <div className="flex text-xs gap-1">
                        <p>{YearCalculate(event.date)}</p>
                        <p>{DateCalculate(event.date)}</p>
                    </div>
                </div>
                <div className="w-full flex flex-row gap-2 justify-between items-center">
                    <div className="flex justify-between items-center">
                        <div className="items-center flex flex-col space-y-2">
                            <Image width={48} height={48} radius="none" src={event.home_team_logo} alt={event.home_team_name}/>
                        </div>
                    </div>
                    <div className="items-center flex justify-between">
                        <div className="items-center flex flex-col space-y-2">
                            <Image width={48} height={48} radius="none" src={event.away_team_logo} alt={event.away_team_name}/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
  )
}

export default GridCard