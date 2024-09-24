"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, Input } from "@nextui-org/react";

import Link from 'next/link';
import CustomerTable from '../DatabaseTable/CustomerTable';
import CustomerDataTable from '../DatabaseTable/CustomerDataTable';

const DatabaseHeader = () => {
    const [data, setData] = useState([]);
    const [option, setOption] = useState();
    const [showAll, setShowAll] = useState(false);

    const pickOption = (option) => {
        setOption(option);
    };

    const renderContent = () => {
        switch (option) {
          case 'Customer':
            return <CustomerTable/>
          case 'Customer Data':
            return <CustomerDataTable/>
          default:
            return <div className="text-red-500 text-center py-4">Choose your table</div>;
        }
      };

    return (
        <NextUIProvider>
            <div className='flex w-full flex-col mt-6'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                        <button onClick={() => pickOption("Customer")} className={`px-4 py-1 border rounded-lg ${option == "Customer" ? 'bg-black text-white' : "bg-white text-black" }`}>Customer</button>
                        <button onClick={() => pickOption("Customer Data")} className={`px-4 py-1 border rounded-lg ${option == "Customer Data" ? 'bg-black text-white' : "bg-white text-black" }`}>Customer Data</button>
                    </div>
                </div>
                <div className='flex w-full h-screen'>
                    {renderContent()}
                </div>
            </div>
        </NextUIProvider>
  )
}

export default DatabaseHeader