import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSignOut } from '../Authentication/useSignOut';
import DropdownMenu from "./DropdownMenu";
import { useAuth } from "../Authentication/Auth";

function HeaderWithNavbar() {
  const { currentUser } = useAuth();
  const signOut = useSignOut();
  const [date, setDate] = useState(new Date());

  // Adjusted: Client items now include 'Add Client' only for Admins
  const clientItems = currentUser?.role === 'Admin' ? [
    { href: '/AddClient', label: 'Add Client' },
    { href: '/ClientList', label: 'Client List' },
  ] : [
    { href: '/ClientList', label: 'Client List' },
  ];

  // User items, only visible for Admin
  const userItems = [
    { href: '/RegisterPage', label: 'Add User' },
    { href: '/UsersList', label: 'Users List' },
  ];

  return (
    <div className="bg-darkblue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        {/* Date on the Left */}
        <div className="flex-1">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold">Today's Date:</p>
            <p className="text-xl">{date.toDateString()}</p>
          </div>
        </div>

        {/* Title and Version in the Middle */}
        <div className="flex-1 text-center">
          <Link to="/MainPage">
            <p className="text-xl font-semibold">Drey Dog Scheduler</p>
            <p className="text-sm">Scheduling Made Simple</p>
            <p className="text-xs bg-neutraldark px-3 py-1 inline-block rounded-full">v0.4.4</p>
          </Link>
        </div>

        {/* Navigation and Sign-Out on the Right */}
        <div className="flex-1 flex justify-center md:justify-end">
          <nav className="text-primarytext flex justify-center md:justify-end mb-4 md:mb-0 space-x-4">
            {(currentUser?.role === 'Trainer' || currentUser?.role === 'Admin') && (
              <Link to="/ScheduleView" className="hover:text-secondarytext py-2">Schedule</Link>
            )}
            <DropdownMenu title="Clients" items={clientItems} />
            {currentUser?.role === 'Admin' && (
              <DropdownMenu title="Users" items={userItems} />
            )}
          </nav>
          <button onClick={signOut} className="text-primarytext hover:bg-softblue hover:text-darkblue py-2 px-4 border border-transparent rounded-md ml-2">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderWithNavbar;
