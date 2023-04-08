import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import { ParticipantsService } from "../pages/api/services/ParticipantsService";
import { Participant } from '../types';
import PopOverHeader from './PopOverHeader';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

function Participants() {
  const [data, setData] = useState<Participant[]>([]);
  const [active, setActive] = useState<Participant[] | null>(null);
  const [adminFilter, setAdminFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const { data: session, status } = useSession();

  useEffect(() => {
    ParticipantsService.getParticipants("")
      .then(data => {setData(data); setActive(data)})
      .catch(error => console.error(error));
  }, []);

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

  if (active) {
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
    return (
      <div>
        <div className="text-xl mb-8">PARTICIPANT DATA</div>
        <p>Loading...</p>
      </div>
    )
  }
}

export default Participants;
