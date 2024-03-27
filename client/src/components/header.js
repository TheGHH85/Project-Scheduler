import React, {useState, useEffect} from "react";
import { useSignOut } from '../Authentication/useSignOut';


function Header(){
  const signOut = useSignOut();
const [date, setDate] = useState(new Date());



return (
  <>
    <div className="bg-darkblue text-white shadow-md">
      <div className="px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      <div className="text-center mb-2 md:mb-0">
          <p className="text-lg font-semibold">Todays Date:</p>
          <p className="text-xl">{date.toDateString()}</p>
        </div>
        <div className="text-center mb-2 md:mb-0">
          <p className="text-xl font-semibold">Drey Dog Scheduler</p>
          <p className="text-sm">Scheduling Made Simple</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <button className="text-sm md:text-lg hover:bg-softblue rounded-full px-3 py-1 mb-2 md:mb-0 md:mr-4" onClick={signOut}>Sign Out</button> 
          <p className="text-xs md:text-sm bg-neutraldark px-3 py-1 rounded-full">v0.4.5</p>
        </div>
      </div>
    </div>
  </>
);


}

export default Header;