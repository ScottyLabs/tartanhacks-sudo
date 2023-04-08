import clsx from "clsx";
import Link from "next/link";
import CheckIcon from "../icons/CheckIcon";
import PersonIcon from "../icons/PersonIcon";
import HomeIcon from "../icons/HomeIcon";

interface SideNavProps {
  selection?: string;
}

interface DashboardLinkProps {
  children?: React.ReactNode;
  target: string;
  selection?: string;
}

/**
 * A single entry link in the SideNav
 */
function DashboardLink({ children, target, selection }: DashboardLinkProps) {
  const selected = (target === selection) || (target == "" && selection == null);
  return (
    <Link
      href={`/?dashboard=${target}`}
      data-mdb-ripple="true"
      data-mdb-ripple-color="dark"
      shallow
    >
      <div
        className={clsx(
          selected
            ? "bg-gray-200 text-green-900"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          "flex h-12 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded py-4 px-6 text-sm transition duration-300 ease-in-out"
        )}
      >
        {children}
      </div>
    </Link>
  );
}

/**
 * A side navigation bar
 */
export default function SideNav({ selection }: SideNavProps) {
  return (
    <div className="absolute h-full w-60 bg-white">
      <ul className="relative">
        <li className="relative">
          <DashboardLink target="" selection={selection}>
            <HomeIcon className="mr-3" />
            <span>Home</span>
          </DashboardLink>
        </li>
        <li className="relative">
          <DashboardLink target="participants" selection={selection}>
            <PersonIcon className="mr-3" />
            <span>Participants</span>
          </DashboardLink>
        </li>
        <li className="relative">
          <DashboardLink target="checkins" selection={selection}>
            <CheckIcon className="mr-3" />
            <span>Check-ins</span>
          </DashboardLink>
        </li>
      </ul>
    </div>
  );
}
