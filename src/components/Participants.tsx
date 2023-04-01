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
} from '@chakra-ui/react'

function Participants() {
  const [data, setData] = useState<Participant[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    ParticipantsService.getParticipants("", session?.accessToken as string)
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  if (data) {
    return (
      <TableContainer>
        <Table variant='striped'>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>email</Th>
              <Th>admin</Th>
              <Th>status</Th>
              <Th>judge</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(item => {
              return (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.email}</td>
                  <td>{String(item.admin ?? false).toUpperCase()}</td>
                  <td>{item.status}</td>
                  <td>{String(item.judge ?? false).toUpperCase()}</td>
                </tr>
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
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Participants;
