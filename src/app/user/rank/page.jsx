"use client"

import { React, useEffect, useState } from 'react'
import { NextUIProvider, Select, SelectItem, Input, Button, ButtonGroup, Image } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { FaCrown } from "react-icons/fa";
const UserPartner = () => {
  const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/user/rank`);
            if (!response.ok) {
            throw new Error(`No data found`);
            }
            const result = await response.json();
            setData(result)
        } catch (error) {
            console.log(error);;
        }

        };
        fetchData();
    }, []);

  return (
    <NextUIProvider>
      <div className='flex flex-row w-full z-30'>
        <div className='hidden md:flex lg:w-1/4 mt-1'></div>

        <div className="w-full lg:w-2/4 h-full mr-auto mt-1 mx-auto flex flex-col ">
          <div className='flex flex-col w-full mt-16 bg-white rounded-xl gap-4 p-4'>
            <Table 
              color={"primary"}
              removeWrapper={false}
              isHeaderSticky={true}
              aria-label="Example static collection table"
              shadow="none"
              showSelectionCheckboxes={false}
              >
              <TableHeader className="bg-primary">
                <TableColumn className="bg-black text-white"># Rank</TableColumn>
                <TableColumn className="bg-black text-white w-full">User</TableColumn>
                <TableColumn className="bg-black text-white w-1/5">Favorite</TableColumn>
                <TableColumn className="bg-black text-white w-1/5">Point</TableColumn>
              </TableHeader>
              <TableBody>
                {data.map((row, index) =>
                  <TableRow key={index}
                  className={index == 9 ? 'border-b-1' :  index < 10 ? 'font-semibold' : ''}>
                    <TableCell className={`text-xs md:text-sm ${index == 0 ? 'text-primary' : index == 1 ? 'text-gray-400' : index == 2 ? 'text-yellow-700' :  index < 10 ? 'text-black font-semibold' : ''}`}>{index < 3 ? <FaCrown/> : index + 1}</TableCell>
                    <TableCell className={`flex w-full ${index < 10 ? 'text-black font-semibold' : ''}`}> <div className='flex gap-2 items-center'><Image width={32} src={row.profile} alt={row.username}/><a className="hover:underline" href={`/user/${row.customer_id}`}> {row.username} </a></div></TableCell>
                    <TableCell className={`text-xs md:text-sm w-1/5 ${index < 10 ? 'text-black font-semibold' : ''}`}>{row.name}</TableCell>
                    <TableCell className={`text-xs md:text-sm w-1/5 ${index < 10 ? 'text-black font-semibold' : ''}`}>{row.point}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className='hidden md:flex lg:w-1/4 mt-1'></div>
      </div>
    </NextUIProvider>
  );
};

export default UserPartner;
