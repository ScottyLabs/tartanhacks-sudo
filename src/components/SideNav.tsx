import Link from "next/link";
import CheckIcon from "../icons/CheckIcon";
import PersonIcon from "../icons/PersonIcon";

/**
 * A side navigation bar
 */
export default function SideNav() {
  return (
    <div className="absolute h-full w-60 bg-white px-1 shadow-md">
      <ul className="relative">
        <li className="relative">
          <Link
            className="flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 px-6 text-sm text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <PersonIcon className="mr-3" />
            <span>Participants</span>
          </Link>
        </li>
        <li className="relative">
          <Link
            className="flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 px-6 text-sm text-gray-700 transition duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-900"
            href="#!"
            data-mdb-ripple="true"
            data-mdb-ripple-color="dark"
          >
            <CheckIcon className="mr-3" />
            <span>Check-ins</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
