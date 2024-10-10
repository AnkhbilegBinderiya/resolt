import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { React, useEffect, useState } from 'react'
import {Image} from "@nextui-org/image";
import Link from "next/link";

const Standing = ({id}) => {
    
    const [data, setData] = useState([]);

    console.log(id)

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/standing/nba`, { cache: 'no-store' });
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
    }, [id]);

    return (
        <div className="w-full">
          <Table 
            color={"default"}
            removeWrapper={false}
            isHeaderSticky={true}
            selectionMode="single" 
            defaultSelectedKeys={[id]} 
            aria-label="Example static collection table"
            shadow="none"
          >
          <TableHeader className="bg-primary">
            <TableColumn className="bg-black text-white text-center">#</TableColumn>
            <TableColumn className="bg-black text-white"></TableColumn>
            <TableColumn className="bg-black text-white">Name</TableColumn>
            <TableColumn className="bg-black text-white">Win</TableColumn>
            <TableColumn className="bg-black text-white">Lose</TableColumn>
            <TableColumn className="bg-black text-white">PCT</TableColumn>
            <TableColumn className="bg-black text-white">PPG</TableColumn>
            <TableColumn className="bg-black text-white">OPPG</TableColumn>
            <TableColumn className="bg-black text-white">Last10</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((row, index) =>
              <TableRow key={row.team_id}>
                <TableCell className="text-xs text-center md:text-sm">{index + 1}</TableCell>
                <TableCell className="flex w-full justify-center"><Image width={24} height={24} radius="none" src={row.logo} alt={row.name}/></TableCell>
                <TableCell className="text-xs md:text-sm hover:underline"> <Link href={`/team/nba/${row.team_id}`}> {row.name} </Link></TableCell>
                <TableCell className="text-xs md:text-sm">{row.Win}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.Lose}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.PCT}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.PPG}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.OPPG}</TableCell>
                <TableCell className="text-xs md:text-sm">{row.LastTenWin}-{row.LastTenLose}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
      );
}

export default Standing