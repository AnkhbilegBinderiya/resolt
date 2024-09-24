import React from "react";
import {Progress} from "@nextui-org/react";
//import { Progress } from "@/components/ui/progress"
import classNames from 'classnames';

const StatLine = ({name, homeStat, awayStat}) => {

    const sum = homeStat + awayStat;

    const isHomeGreater = homeStat > awayStat;
    const isAwayGreater = awayStat > homeStat;
    const checkGreater = (value1, value2) =>{
        if(value1 > value2){
            return "bg-primary"
        }else{
             return "bg-black dark:bg-white/50"
        }
    }

    return (
        <div className="flex flex-col items-center w-full py-2 gap-1">
            <div className="w-full text-black dark:text-white font-medium flex justify-between text-xs">
                <p>{homeStat}</p>
                {name}
                <p>{awayStat}</p>
            </div>
            <div className="w-full flex gap-1">
                <div className={`w-full -scale-x-100 ${isHomeGreater ? 'text-green-500' : 'text-gray-500'}`}>
                    <Progress
                        classNames={{indicator: `${checkGreater(homeStat, awayStat)}`}}
                        value={homeStat}
                        size="md"
                        maxValue={sum}
                    />
                </div>
                <div className={classNames('w-full', {
                    'text-primary': !isHomeGreater,
                    'text-black': isHomeGreater,
                })}>
                    <Progress
                        classNames={{indicator: `${checkGreater(awayStat, homeStat)}`}}
                        value={awayStat}
                        size="md"
                        maxValue={sum}
                    />
                </div>
            </div>
        </div>
  )
}

export default StatLine