import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { ParticipantsService, Participant } from "../pages/api/services/ParticipantsService";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Box, 
  Button,
  Select
} from '@chakra-ui/react'

function Participants() {
  const [data, setData] = useState<Participant[]>([]);
  const [active, setActive] = useState<Participant[]>([]);
  const [adminFilter, setAdminFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const { data: session, status } = useSession();

  useEffect(() => {
    ParticipantsService.getParticipants("", session?.accessToken as string)
      .then(data => {setData(data); setActive(data)})
      .catch(error => console.error(error));
  }, []);

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function filterAdmin() {
    const options = ["", true, false]
    const match = options[randInt(0, options.length)]
    setAdminFilter(String(match))
    setActive(data.filter(p => match ? p.admin == match : true))
  }

  const changeAdminFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val : string = event.target.value
    setAdminFilter(val)
    setActive(data.filter(p => String(p.admin).toUpperCase() == val || val == "ALL"))
  };

  function filterStatus() {
    const options = ["", "CONFIRMED", "ADMITTED", "VERIFIED", "DECLINED"]
    const match = options[randInt(0, options.length)]
    setStatusFilter(match ?? "")
    setActive(data.filter(p => match ? p.status == match : true))
  }

  if (data) {
    return (
      <div>
        <div className="text-xl mb-8">PARTICIPANT DATA</div>
        <TableContainer>
          <Table size="sm" variant='striped'>
            <Thead>
              <Tr>
                <Th>id</Th>
                <Th>email</Th>
                <Th className='hover:bg-yellow-100'>
                  <Popover>
                    <PopoverTrigger>
                      <Box tabIndex={0} role='button'>
                        {"admin" + (adminFilter == "ALL" ? "" : `: ${adminFilter}`)}
                      </Box>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Admin Options</PopoverHeader>
                      <PopoverBody>
                        <div className='mb-2'>Filter:</div>
                        <Select size="sm" placeholder='Select option' onChange={changeAdminFilter}>
                          <option value='ALL'>All</option>
                          <option value='TRUE'>True</option>
                          <option value='FALSE'>False</option>
                        </Select>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Th>
                <Th className='hover:bg-yellow-100' onClick={filterStatus}>
                  {"status" + (statusFilter && `: ${statusFilter}`)}
                </Th>
                <Th className='hover:bg-yellow-100'>judge</Th>
              </Tr>
            </Thead>
            <Tbody>
              {active.map(participant => {
                return (
                  <Tr key={participant._id}>
                    <Td>{participant._id}</Td>
                    <Td>{participant.email}</Td>
                    <Td>{String(participant.admin ?? false).toUpperCase()}</Td>
                    <Td>{participant.status}</Td>
                    <Td>{String(participant.judge ?? false).toUpperCase()}</Td>
                  </Tr>
                );
              })}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>id</Th>
                <Th>email</Th>
                <Th>admin</Th>
                <Th>status</Th>
                <Th>judge</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Participants;
