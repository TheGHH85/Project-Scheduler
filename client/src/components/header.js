import React, {useState, useEffect} from "react";
import { useSignOut } from '../Authentication/useSignOut';

function Header(){
  const signOut = useSignOut();
const [currentDate, setCurrentDate] = useState(new Date());

useEffect(() => {
    const interval = setInterval(() => {
        setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
}, []);

return (
  <>
    <div className="bg-darkblue text-white shadow-md">
      <div className="px-4 py-3 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-2 md:mb-0">
          <p className="text-sm md:text-lg">{currentDate.toLocaleString()}</p>
        </div>
        <div className="text-center mb-2 md:mb-0">
          <p className="text-xl font-semibold">Drey Dog Scheduler</p>
          <p className="text-sm">Scheduling Made Simple</p>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <button className="text-sm md:text-lg hover:bg-softblue rounded-full px-3 py-1 mb-2 md:mb-0 md:mr-4" onClick={signOut}>Sign Out</button> 
          <p className="text-xs md:text-sm bg-neutraldark px-3 py-1 rounded-full">v0.4.1</p>
        </div>
      </div>
    </div>
  </>
);


}

export default Header;