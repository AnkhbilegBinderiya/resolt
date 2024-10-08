"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, DatePicker, Input } from "@nextui-org/react";
import PickCard from '@/components/PickCard/PickCard'
import LoadingSpinner from '@/components/Loading/loading';

const UserBalance = ({id}) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:6969/user/balance/${id}`);
                const result = await response.json();
                setData(result);

                const totalResponse = await fetch(`http://localhost:6969/user/balance/total/${id}`);
                const total = await totalResponse.json();
                setTotal(total[0]);
            } catch (error) {
                setData([]);
                setTotal([]);
            }
        };
        fetchData();
    }, [id]);

    const DateCalculate = (date) =>{
        const dateObject = new Date(date);
       
        const day = dateObject.getDate();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthIndex = dateObject.getMonth();
        const monthName = monthNames[monthIndex];

        const dayString = String(day).padStart(2, '0');
        const dateString = `${monthName}-${dayString}`;
        return dateString;
    }

    const YearCalculate = (date) =>{
        const dateObject = new Date(date);
        const year = dateObject.getFullYear();
        const yearString = String(year);
        return yearString;
    }

    const amountSlicer = (amount) => {
        let validAmount = isNaN(amount) ? 0 : parseFloat(amount);
        return validAmount.toFixed(2);
      };

    return (
        <NextUIProvider>
            <div className='w-full rounded-lg flex flex-col'>
                { data.length > 0 ? (
                    <div className='w-full gap-2'>
                         <div className={`w-full flex justify-between mb-2 py-2 px-4 rounded-lg ${total.total > 0 ? 'bg-green-600' : total.total < 0 ? 'bg-red-600' : 'bg-labelLight'}` }>
                            <p>Total</p>
                            <p>{amountSlicer(total.total)}</p>
                        </div>
                        {data.map((da) => (
                            <div className="flex w-full py-1 text-sm items-center" key={da.id}>
                                <div className='flex gap-1 w-2/4'>
                                    <p className="">{YearCalculate(da.createdAt)}</p>
                                    <p className="">{DateCalculate(da.createdAt)}</p>
                                </div>
                                <p className={`w-1/4 text-center rounded-lg text-white text-xs py-1 ${da.is_debit == 1 ? 'bg-green-700' : 'bg-red-500'}`}>{da.status}</p>
                                <p className={`w-1/4 text-end ${da.is_debit == 1 ? 'text-green-700' : 'text-red-500'}`}>{da.is_debit == 1 ? '+' : ''}{amountSlicer(da.amount)} $</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='flex w-full gap-1'>
                        <p>You haven&apos;t any partner account</p>
                    </div>
                )}
            </div>
        </NextUIProvider>
  )
}

export default UserBalance