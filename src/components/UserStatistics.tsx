import PeopleIcon from "../icons/PeopleIcon";

interface Props {
    fieldName: string;
    numUsers: number;
}

export default function UserStatistics({ fieldName, numUsers }: Props) {
    return (
        <div className="inline-flex items-center">
            <PeopleIcon />
            <div className="ml-1">
                <p className="">{fieldName} users: {numUsers}</p>
            </div>
        </div>
    );
}