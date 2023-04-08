import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { ParticipantsService } from "../pages/api/services/ParticipantsService";
import { Participant } from '../types';
import PopOverHeader from './PopOverHeader';
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
  Box, 
  Button,
  Select
} from '@chakra-ui/react'

function Participants() {
  const [data, setData] = useState<Participant[]>([]);
  const [active, setActive] = useState<Participant[]>([]);
  const [adminFilter, setAdminFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const { data: session, status } = useSession();

  useEffect(() => {
    ParticipantsService.getParticipants("", session?.accessToken as string)
      .then(data => {setData(data); setActive(data)})
      .catch(error => console.error(error));
  }, []);

  function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const changeAdminFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val : string = event.target.value
    setAdminFilter(val)
    setActive(data.filter(p => String(p.admin).toUpperCase() == val || val == "ALL"))
  };

  const changeStatusFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const val: string = event.target.value
    setStatusFilter(val)
    setActive(data.filter(p => String(p.status).toUpperCase() == val || val == "ALL"))
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
                <Th>Last Name</Th>
                <Th>First Name</Th>
                <Th>Email</Th>
                <PopOverHeader
                  label= {"admin" + (adminFilter == "ALL" ? "" : `: ${adminFilter}`)}
                  filterOptions={["ALL", "TRUE", "FALSE"]}
                  defaultValue={adminFilter}
                  onChange={changeAdminFilter}
                />
                <PopOverHeader
                  label= {"status" + (statusFilter == "ALL" ? "" : `: ${statusFilter}`)}
                  filterOptions={["ALL", "CONFIRMED", "ADMITTED", "VERIFIED", "DECLINED"]}
                  defaultValue={statusFilter}
                  onChange={changeStatusFilter}
                />
              </Tr>
            </Thead>
            <Tbody>
              {active.map(participant => {
                return (
                  <Tr key={participant._id}>
                    <Td>{participant.profile.lastName}</Td>
                    <Td>{participant.profile.firstName}</Td>
                    <Td>{participant.email}</Td>
                    <Td>{String(participant.admin ?? false).toUpperCase()}</Td>
                    <Td>{participant.status}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Participants;
