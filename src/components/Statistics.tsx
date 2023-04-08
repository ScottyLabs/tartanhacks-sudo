import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import GroupIcon from "../icons/GroupIcon";
import { ParticipantsService } from "../pages/api/services/ParticipantsService";
import { Participant } from '../types';
import PeopleIcon from "../icons/PeopleIcon";

function countParticipants(users: Participant[], status: string) {
    let count = 0;
    users.forEach(element => {
        if (element["status"] == status) count++;
    });
    return count;
}

function Statistics() {
    const [data, setData] = useState<Participant[]>([]);
    const [loaded, setLoaded] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        ParticipantsService.getParticipants("")
            .then(data => { setData(data); setLoaded(true) })
            .catch(error => console.error(error));
    }, []);

    if (loaded) {
        const statLabels = ["Unverified", "Verified", "Applied", "Admitted", "Rejected", "Waitlisted", "Declined", "Confirmed"];

        return (
            <div>
                <div className="inline-flex items-center mb-5">
                    <GroupIcon thickness="2" />
                    <div className="ml-1">
                        <p className="text-xl font-medium">Total users: {data.length}</p>
                    </div>
                </div>
                <br />
                {statLabels.map((statLabel) => {
                    return (
                        <div key={statLabel}>
                            <ParticipantStatistics status={statLabel} numUsers={countParticipants(data, statLabel.toUpperCase())} />
                            <br />
                        </div>
                    );
                })}
            </div>

        );
    } else {
        return <p>Loading...</p>;
    }
}

interface ParticipantStatisticsProps {
    status: string;
    numUsers: number;
}

function ParticipantStatistics({ status, numUsers }: ParticipantStatisticsProps) {
    return (
        <div className="inline-flex items-center">
            <PeopleIcon />
            <div className="ml-1">
                <p className="">{status} users: {numUsers}</p>
            </div>
        </div>
    );
}

export default Statistics;