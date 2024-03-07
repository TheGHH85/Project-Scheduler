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

return(
<>
  <div className="flex items-center w-full px-6 py-4 bg-blue-600 text-white shadow-md">
    <div className="flex justify-start w-1/4">
      <p className="text-lg">{currentDate.toLocaleString()}</p>
    </div>
    <div className="flex-1 text-center">
      <p className="text-xl font-semibold">Drey Dog Scheduler</p>
      <p className="text-md">Scheduling Made Simple</p>
    </div>
    <div className="flex justify-end w-1/4">
    <button className="text-lg mr-4 hover:bg-blue-700 rounded-full px-3 " onClick={signOut}>Sign Out</button> 
      <p className="text-sm bg-blue-700 px-3 py-1 rounded-full">v0.3.1</p>
    </div>
  </div>
</>


  
);
}

export default Header;