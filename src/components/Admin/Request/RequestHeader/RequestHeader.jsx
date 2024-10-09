"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, Input } from "@nextui-org/react";

import Link from 'next/link';

import { CiSearch } from "react-icons/ci";
import PlanTable from '../RequestTable/PlanTable';
import PartnerTable from '../RequestTable/PartnerTable';

const RequestHeader = () => {
    const [data, setData] = useState([]);
    const [option, setOption] = useState();
    const [showAll, setShowAll] = useState(false);

    const pickOption = (option) => {
        setOption(option);
    };

    const renderContent = () => {
        switch (option) {
          case 'Plan':
            return <PlanTable/>
          case 'Partner':
            return <PartnerTable/>;
          default:
            return <div className="text-red-500 text-center py-4">Choose your table</div>;
        }
      };

    return (
        <NextUIProvider>
            <div className='flex w-full flex-col mt-6'>
                <div className='flex w-full justify-between'>
                    <div className='flex gap-2'>
                        <button onClick={() => pickOption("Plan")} className={`px-4 border rounded-lg ${option == "Plan" ? 'bg-black text-white' : "bg-white text-black" }`}>Plan</button>
                        <button onClick={() => pickOption("Partner")} className={`px-4 border rounded-lg ${option == "Partner" ? 'bg-black text-white' : "bg-white text-black" }`}>Partner</button>
                    </div>
                    <div>
                        <Input
                                classNames={{
                                    base: "max-w-full md:max-w-[20rem]",
                                    mainWrapper: "h-full",
                                    input: "text-small",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                placeholder="Type to search..."
                                size="sm"
                                startContent={<CiSearch size={18} />}
                                type="search"
                                aria-label="resoltx"
                        />
                    </div>
                </div>
                <div className='flex w-full h-screen'>
                    {renderContent()}
                </div>
            </div>
        </NextUIProvider>
  )
}

export default RequestHeader