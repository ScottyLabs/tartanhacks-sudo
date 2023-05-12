import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import PeopleIcon from "../icons/PeopleIcon";

type peopleData = string;
let peopleData = "";

function Statistics() {
    const [data, setData] = useState<string>('');
    const { data: session, status } = useSession();

    useEffect(() => {
        fetch('https://dev.backend.tartanhacks.com/participants', {
            headers: {
                'x-access-token': session?.accessToken as string
            }
        })
            .then(response => response.json() as Promise<string>)
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    peopleData = JSON.stringify(data, null, 2);
    if (data) {
        return (
            <div>
                <p>Received data:</p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
}

function getPeopleData()
{
    return peopleData;
}

export default Statistics;
