import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link";

const PlanTable = () => {
    
    const [data, setData] = useState([]);
    const [id, setId] = useState();
    const [value, setValue] = useState();
    const [username, setUsername] = useState();
    const [editor, setEditor] = useState(false);

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/admin/crm/plan/request`);
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

    const extractDate = (isoDateString) => {
        return isoDateString.split('T')[0];
    }

    const valueSetter = (id, name, value) =>{
      setId(id);
      setValue(value)
      setUsername(name)
      setEditor(true);
    }

    const saveCustomerData = async () => {
      const payload = {
        id : id,
        value : value
      };

      try {
        // Send the POST request
        const response = await fetch("http://localhost:6969/admin/crm/status/request/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();

          const { message } = data;
          toast.success(`Success`, {position: 'top-center'});
        } else {
          // Handle error response
          const errorData = await response.json();
          toast.error(`${errorData.message}`, {position: 'top-center'});
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    }


    if(editor){
      return (
        <NextUIProvider>
          <div className="w-full flex flex-col gap-4 mt-12">
            <Input
                  aria-label="username"
                  label="username"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                  aria-label="resoltx"
                  label="Status"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="flat"
                  size="md"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={() => saveCustomerData()} className="bg-blue-700 text-white py-2 px-4 rounded-lg">
              Save
            </button>
          </div>
        </NextUIProvider>
      )
    }else{
    return (
        <div className="w-full">
          <Table 
            color={"default"}
            removeWrapper={false}
            isHeaderSticky={true}
            selectionMode="single"
            aria-label="Example static collection table"
            shadow="none"
          >
          <TableHeader className="bg-primary">
            <TableColumn className="bg-black text-white text-center">#</TableColumn>
            <TableColumn className="bg-black text-white">U.Name</TableColumn>
            <TableColumn className="bg-black text-white">U.Email</TableColumn>
            <TableColumn className="bg-black text-white">U.Plan</TableColumn>
            <TableColumn className="bg-black text-white">Request</TableColumn>
            <TableColumn className="bg-black text-white">Transfer Bank</TableColumn>
            <TableColumn className="bg-black text-white">Plan Wanted</TableColumn>
            <TableColumn className="bg-black text-white">Months</TableColumn>
            <TableColumn className="bg-black text-white">MNT</TableColumn>
            <TableColumn className="bg-black text-white">USD</TableColumn>
            <TableColumn className="bg-black text-white">Status</TableColumn>
            <TableColumn className="bg-black text-white">created</TableColumn>
            <TableColumn className="bg-black text-white">updated</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((row) =>
              <TableRow key={row.team_id}>
                <TableCell className="text-xs text-center md:text-sm">{row.id}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.customer_id} - {row.username}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.email}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.plan_now ? row.plan_now : '-'}</TableCell>
                <TableCell className="text-xs md:text-sm"><button onClick={() => valueSetter(row.id, row.username, row.status)} className="bg-primary px-3 py-1 rounded-md text-white">Edit</button></TableCell>
                <TableCell className="text-xs md:text-sm">{row.bank_name}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.plan_want}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.months}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.usd}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.mnt}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.status}</TableCell>
                <TableCell className="text-xs md:text-sm">{extractDate(row.createdAt)}</TableCell>
                <TableCell className="text-xs md:text-sm">{extractDate(row.updatedAt)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      );
    }
}

export default PlanTable