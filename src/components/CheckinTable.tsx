import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    HStack,
    Box,
  } from '@chakra-ui/react'

import {CheckIn} from "../pages/api/services/CheckinServices";
import {CheckInItemType} from "../pages/api/services/CheckinServices";
import React, { useState, useEffect } from 'react';  
import { useSession } from "next-auth/react";
import Sidebar from '../components/Sidebar';

  function CheckInTable()
  {
    const [allCheckIns, setAllCheckIns] = useState<CheckInItemType[]>([]);
    const [activeCheckIns, setActiveCheckIns] = useState<CheckInItemType[]>([]);
    const {data: session, status} = useSession();
    const [pins, setPins] = useState<CheckInItemType[]>([]);

    useEffect(() => {
        CheckIn.checkInItems(session?.accessToken as string)
          .then(data => {setAllCheckIns(data); setActiveCheckIns([...data]); sortName()})
          .catch(error => console.error(error));
      }, []);

    
    function compareFunc(a: string, b:string)
    {
        if (a < b)
        {
            return -1;
        }
        else if (a > b)
        {
            return 1;
        }
        return 0
    }

    const sortStartTime = () =>
    {   
        setActiveCheckIns((activeCheckIns) => [...activeCheckIns].sort((a,b) => a.startTime- b.startTime + compareFunc(a.name.toLowerCase(), b.name.toLowerCase())))
    }

    const sortEndTime = () =>
    {
        setActiveCheckIns((activeCheckIns) => [...activeCheckIns].sort((a,b) => a.endTime- b.endTime + compareFunc(a.name.toLowerCase(), b.name.toLowerCase())))
    }

    const sortName = () =>
    {
        setActiveCheckIns((activeCheckIns) => [...activeCheckIns].sort((a,b) => {return (compareFunc(a.name.toLowerCase(), b.name.toLowerCase()) + ((a.active > b.active)? 1 :0))}))
    }

    const modifyPin = (pin: CheckInItemType) =>
    {
        setPins((pins) => {
            let newPin = [...pins]; 
            if (!pins.includes(pin))
            {
                newPin.push(pin); 
            }
            else
            {
                const index = newPin.indexOf(pin);
                newPin.splice(index, 1);
            }
            return newPin})
    }
      
    
    if (allCheckIns){
        return (
            <div>
                <HStack align = "top">
                <Box className = "overflow-x-scroll">
                <div className="text-xl mb-8">CHECKIN ITEMS</div>
                <TableContainer>
                    <Table size="sm" variant='striped'>
                        <Thead>
                            <Tr>
                                <Th>Pin</Th>
                                <Th>Active</Th>
                                <Th className='hover:bg-yellow-100' onClick = {sortName}>Name</Th>
                                <Th>Description</Th>
                                <Th className='hover:bg-yellow-100' onClick = {sortStartTime} >Start Time</Th >
                                <Th className='hover:bg-yellow-100' onClick = {sortEndTime} >End Time</Th>
                                <Th>Points</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {activeCheckIns.map(item => {
                                let startDate = new Date(item.startTime)
                                let endDate = new Date(item.endTime)
                                const options = {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: '2-digit', 
                                    minute:'2-digit',
                                } as const;
                                return(
                                    //icons later??
                                    <Tr>
                                        <Td><Button colorScheme = {pins.includes(item)? 'blue': 'gray'} onClick = {() => modifyPin(item)}>Pin</Button> </Td>
                                        <Td>{item.active? "Yes": "No"}</Td>
                                        <Td>{item.name}</Td>
                                        <Td>{item.description}</Td>
                                        <Td>{startDate.toLocaleString("en-US", options)} </Td>
                                        <Td>{endDate.toLocaleString("en-US", options)}</Td>
                                        <Td>{item.points}</Td>
                                    </Tr>
                            )})}
                        </Tbody>
                    </Table>
            </TableContainer>
            </Box>
            <Box>
                <div className = "overflow-y-scroll">
                {
                    Sidebar(pins)
                }
                </div>
            </Box>
            </HStack>
            </div>
        );
    } else {
        return <p>Loading...</p>;
      }
  }

  export default CheckInTable;