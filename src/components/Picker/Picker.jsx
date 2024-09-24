"use client"

import { React, useEffect, useState } from 'react'
// import Image from 'next/image'
import { Image } from "@nextui-org/react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { BsEmojiSunglassesFill } from "react-icons/bs";
import { BsHandThumbsDownFill } from "react-icons/bs";

const Prediction = ({id}) => {
    const [header, setHeader] = useState([]);
    const [pick, setPick] = useState(null);
    const [block, setBlock] = useState(null);
    const [option1, setOption1] = useState(1);
    const [optionX, setOptionX] = useState(0);
    const [option2, setOption2] = useState(1);
    const [process1, setProcess1] = useState(0);
    const [processX, setProcessX] = useState(0);
    const [process2, setProcess2] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:6969/events/pick/${id}`);
                if (!response.ok) {
                    throw new Error('No data found');
                }
                const result = await response.json();
                setHeader(result);

                const storedPick = Cookies.get(id);
                setBlock(storedPick);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        if (header) {
            setOption1(header.option_one);
            setOptionX(header.option_draw);
            setOption2(header.option_two);
        }
    }, [header]);

    const Calculate = useCallback(() => {
        let total = option1 + optionX + option2;

        let calc1 = (option1 / total) * 100;
        let calcX = (optionX / total) * 100;
        let calc2 = (option2 / total) * 100;

        if (header.type === 1) {
            setProcess1(calc1.toFixed(1));
            setProcess2(calc2.toFixed(1));
            setProcessX(0); // Not used in type 1
        } else {
            setProcess1(calc1.toFixed(1));
            setProcessX(calcX.toFixed(1));
            setProcess2(calc2.toFixed(1));
        }
    }, [option1, optionX, option2, header]);

    const SavePick = useCallback(async () => {

        const payload = {id, pick};
        try {
            const response = await fetch("http://localhost:6969/events/pick", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                toast.success(`Баярлалаа`, {position: 'top-center' , icon: <BsEmojiSunglassesFill className='text-green-600'/>, autoClose: 1000});  
            } else {
              const errorData = await response.json();
              toast.error(`${errorData.message}`, {position: 'top-center' , icon: <BsHandThumbsDownFill className='text-red-600'/>});
            }
          } catch (error) {
            toast.error(`An error occurred: ${error.message}`);
        }
        setPick(null);
    }, [pick, id]);

    useEffect(() => {
        Calculate();
    }, [Calculate]);

    useEffect(() => {
        if (pick !== null) {
            SavePick();
        }
    }, [pick, SavePick]);

    const teamOne = async () => {
        setOption1(option1 + 1);
        Cookies.set(id, "1");
        setPick("1");
        setBlock("1")
    };

    const teamDraw = async () => {
        setOptionX(optionX + 1);
        Cookies.set(id, "x");
        setPick("x");
        setBlock("x")
    };

    const teamTwo = async () => {
        setOption2(option2 + 1);
        Cookies.set(id, "2");
        setPick("2");
        setBlock("2")
    };

    const Empty = () => {
        toast.warning(`You already choose your pick`, {position: 'top-center', icon: <BsEmojiSunglassesFill className='text-primary'/>, autoClose: 1000 });
    };

    if(header.type == 1){
        return (
            <div className="w-full flex p-4 flex-col">
                <div className='flex flex-col w-full gap-2'>
                    <p className='font-semibold text-left ml-4'>Pick A Winner</p>
                    <div className='flex flex-row justify-around items-center gap-2 px-4'>
                        <button onClick={block != null ? Empty : teamOne} className={`flex w-2/4  items-center justify-between rounded-lg  text-black dark:text-white p-2 ${block == 1 ? 'bg-black/10 dark:bg-labelDark' : 'border-1 dark:border-white/10'}`}>
                            <p className='font-semibold '>{process1}%</p>
                            <Image width={48} height={48} src={header.home_team_logo} radius='none' alt={header.home_team_name}/>
                        </button>
                        <button onClick={block != null ? Empty : teamTwo} className={`flex w-2/4  items-center justify-between rounded-lg  text-black dark:text-white p-2 ${block == 2 ? 'bg-black/10 dark:bg-labelDark' : 'border-1 dark:border-white/10'}`}>
                            <Image width={48} height={48} src={header.away_team_logo} radius='none' alt={header.away_team_name}/>
                            <p className='font-semibold '>{process2}%</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }else if(header.type == 2){
        return (
            <div className="w-full flex p-4 flex-col">
                <div className='flex flex-col w-full gap-2'>
                    <p className='font-semibold text-secondary text-left ml-4'>Pick A Winner</p>
                    <div className='flex flex-row justify-around items-center gap-2 px-4'>
                        <button onClick={block != null ? Empty : teamOne} className={`flex w-2/4  items-center justify-between rounded-lg  text-black dark:text-white p-2 ${block == 1 ? 'bg-black/10 dark:bg-labelDark' : 'border-1 dark:border-white/10'}`}>
                            <p className='font-semibold '>{process1}%</p>
                            <Image width={48} height={48} src={header.home_team_logo} radius='none' alt={header.home_team_name}/>
                        </button>
                        <button onClick={block != null ? Empty : teamDraw} className={`flex w-2/4  items-center justify-between rounded-lg  text-black dark:text-white p-5 ${block == "x" ? 'bg-black/10 dark:bg-labelDark' : 'border-1 dark:border-white/10'}`}>
                            <p className='font-semibold '>{processX}%</p>
                            <p>X</p>
                        </button>
                        <button onClick={block != null ? Empty : teamTwo} className={`flex w-2/4  items-center justify-between rounded-lg  text-black dark:text-white p-2 ${block == 2 ? 'bg-black/10 dark:bg-labelDark' : 'border-1 dark:border-white/10'}`}>
                            <Image width={48} height={48} src={header.away_team_logo} radius='none' alt={header.home_team_name}/>
                            <p className='font-semibold '>{process2}%</p>
                        </button>
                    </div>
                </div>
            </div>
        )
    }else{
        <div className="w-full flex p-4 flex-col">
            <div className='flex flex-col w-full gap-2'>
                <p className='font-semibold text-left ml-4'>Pick A Winner</p>
            </div>
        </div>
    }

}

export default Prediction