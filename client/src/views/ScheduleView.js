import React, { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../css/index.css';
import Header from '../components/header';
import Footer from '../components/footer';

function ScheduleView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

   // Generate week days starting from Monday
   const weekDays = Array.from({ length: 7 }).map((_, index) =>
   format(addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), index), 'yyyy-MM-dd', { timeZone: 'UTC' })
 );
 console.log("Week Days:", weekDays);

 const handleDayClick = async (date) => {
  const adjustedDate = format(addDays(new Date(date), 0), 'yyyy-MM-dd');
  console.log("Selected Date:", adjustedDate);

  try {
    const response = await fetch(`http://localhost:8080/classes/${encodeURIComponent(adjustedDate)}`);
    const classes = await response.json();
    console.log("Classes for selected date:", classes);
    // Navigate to the day detail view or update state to display the classes
    navigate(`/DayDetailView/${adjustedDate}`);
  } catch (error) {
    console.error("Error fetching classes:", error);
    // Handle error gracefully, e.g., display an error message to the user
  }
}





    
        return (
          <div className="flex flex-col min-h-screen">
          <div className="flex-grow pb-16">
            <Header />
            <div className="flex justify-center space-x-4 mt-5">
            <Link to="/AddClient" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Client</Link>
            <Link to="/ClientList" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Client List</Link>
        </div>
                <h1 className="text-center text-3xl mt-14">Schedule View</h1>
              
                <div className="my-5">
                    {/* First Row: Monday to Friday */}
                    <div className="flex justify-center mb-4 space-x-2">
                      {weekDays.slice(0, 3).map((day, index) => (
                          <div key={index} 
                               className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                               onClick={() => handleDayClick(day)}>
                              {format(new Date(day), 'EEEE, MMMM d')}
                          </div>
                      ))}
                    </div>
                    {/* Second Row: Saturday and Sunday */}
                    <div className="flex justify-center space-x-2">
                      {weekDays.slice(3).map((day, index) => (
                          <div key={index} 
                               className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                               onClick={() => handleDayClick(day)}>
                              {format(new Date(day), 'EEEE, MMMM d')}
                          </div>
                      ))}
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={prevWeek}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mr-2"
                  >
                    Previous Week
                  </button>
                  <button
                    onClick={nextWeek}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                  >
                    Next Week
                  </button>
                </div>
        </div>
                <Footer />
            </div>
        );
        
    }
    
    export default ScheduleView;