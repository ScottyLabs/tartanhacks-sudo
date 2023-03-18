import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import GroupIcon from "../icons/GroupIcon";
import UserStatistics from './UserStatistics';

interface User {
    status: string;
}

function countUsers(users: User[], status: string) {
    let count = 0;
    users.forEach(element => {
        if (element["status"] == status) count++;
    });
    return count;
}

function Statistics() {
    const [data, setData] = useState<User[]>(Object);
    const [loaded, setLoaded] = useState(false);
    const { data: session } = useSession();


    useEffect(() => {
        fetch('https://dev.backend.tartanhacks.com/participants', {
            headers: {
                'x-access-token': session?.accessToken as string
            }
        })
            .then(response => response.json() as Promise<User[]>)
            .then(data => setData(data))
            .then(() => setLoaded(true))
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
                            <UserStatistics fieldName={statLabel} numUsers={countUsers(data, statLabel.toUpperCase())} />
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

export default Statistics;