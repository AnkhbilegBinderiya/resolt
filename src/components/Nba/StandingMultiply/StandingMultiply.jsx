import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";
import { React, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link";

const StandingMultiply = ({id1, id2}) => {
    
    const [data, setData] = useState([]);

    const homeId = id1;
    const awayId = id2;

    useEffect(() => {
        const fetchData = async () => {

        try {
            const response = await fetch(`http://localhost:6969/standing/nba`);
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
        <div className="w-full">
        <Table color={"default"}
        removeWrapper={false}
        isHeaderSticky={true}
        selectionMode="multiple" 
        showSelectionCheckboxes={false}
        defaultSelectedKeys={[homeId, awayId]} 
        aria-label="Example static collection table"
        shadow="none"
        >
          <TableHeader className="bg-primary">
            <TableColumn className="bg-black dark:bg-labelDark text-white text-center">#</TableColumn>
            <TableColumn className="min-w-12 bg-black dark:bg-labelDark text-white"></TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">Name</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">Win</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">Lose</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">PCT</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">PPG</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">OPPG</TableColumn>
            <TableColumn className="bg-black dark:bg-labelDark text-white">Last10</TableColumn>
          </TableHeader>
          <TableBody>
                {data.map((row, index) => {
                    const isHome = row.team_id === homeId;
                    const isAway = row.team_id === awayId;
                    return (
                        <TableRow key={row.team_id}
                                  className={isHome ? 'bg-[#FAECBF] dark:bg-labelDark' : isAway ? 'bg-[#FAECBF] dark:bg-labelDark' : ''}
                        >
                            <TableCell className="text-xs text-center md:text-sm rounded-l-lg">{index + 1}</TableCell>
                            <TableCell ><Image width={24} height={24} src={row.logo} alt={row.name} /></TableCell>
                            <TableCell className="text-xs md:text-sm hover:underline"><Link href={`/team/nba/${row.team_id}`}> {row.name} </Link></TableCell>
                            <TableCell className="text-xs md:text-sm">{row.Win}</TableCell>
                            <TableCell className="text-xs md:text-sm">{row.Lose}</TableCell>
                            <TableCell className="text-xs md:text-sm">{row.PCT}</TableCell>
                            <TableCell className="text-xs md:text-sm">{row.PPG}</TableCell>
                            <TableCell className="text-xs md:text-sm">{row.OPPG}</TableCell>
                            <TableCell className="text-xs md:text-sm rounded-r-lg">{row.LastTenWin}-{row.LastTenLose}</TableCell>
                        </TableRow>
                    );
                })}
          </TableBody>
        </Table>
        </div>
      );
}

export default StandingMultiply;