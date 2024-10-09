import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { React, useEffect, useState } from 'react'
import { NextUIProvider, Input, Button } from "@nextui-org/react";
import { toast } from 'react-toastify';
import Image from 'next/image'
import Link from "next/link";

const CustomerTable = () => {
    
    const [data, setData] = useState([]);
    const [editor, setEditor] = useState(false);
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [num, setNum] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/admin/crm/customer`);
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

    const valueSetter = (id, username, email, num, role) =>{
      setId(id);
      setUsername(username);
      setEmail(email);
      setNum(num);
      setRole(role);
      setEditor(true);
    }

    const saveCustomerData = async () => {
      const payload = {
        id : id,
        username : username,
        email : email,
        num : num,
        role : role,
      };

      try {
        // Send the POST request
        const response = await fetch("http://localhost:6969/admin/crm/customer", {
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
                  label="#"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  aria-label="resoltx"
            />
            <Input
                  label="username"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  aria-label="resoltx"
            />
            <Input
                  label="email"
                  labelPlacement="outside"
                  placeholder="--------"
                  disabled
                  variant="flat"
                  size="md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="resoltx"
            />
            <Input
                  label="num"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={num}
                  onChange={(e) => setNum(e.target.value)}
                  aria-label="resoltx"
            />
            <Input
                  label="role"
                  labelPlacement="outside"
                  placeholder="--------"
                  variant="bordered"
                  size="md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  aria-label="resoltx"
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
            <TableColumn className="bg-black text-white">password</TableColumn>
            <TableColumn className="bg-black text-white">createdAt</TableColumn>
            <TableColumn className="bg-black text-white">updatedAt</TableColumn>
            <TableColumn className="bg-black text-white">num</TableColumn>
            <TableColumn className="bg-black text-white">role</TableColumn>
            <TableColumn className="bg-black text-white">Action</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((row) =>
              <TableRow key={row.team_id}>
                <TableCell className="text-xs text-center md:text-sm">{row.id}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.username}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.email}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.password}</TableCell>
                <TableCell className="text-xs md:text-sm">{extractDate(row.createdAt)}</TableCell>
                <TableCell className="text-xs md:text-sm">{extractDate(row.updatedAt)}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.num}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.role}</TableCell> 
                <TableCell className="text-xs md:text-sm"><button onClick={() => valueSetter(row.id, row.username, row.email, row.num, row.role)} className="bg-primary px-3 py-1 rounded-md">Edit</button></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      );
    }
}

export default CustomerTable