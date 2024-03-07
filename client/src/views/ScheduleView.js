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
  <div className="flex flex-col min-h-screen bg-darkblue text-primarytext">
      <div className="flex-grow pb-16">
          <Header />
          <div className="flex flex-col items-center space-y-4 mt-8 md:flex-row md:space-y-0 md:space-x-6 md:justify-center">
              <Link to="/AddClient" className="bg-accent1 hover:bg-accent2 text-white font-bold py-4 px-6 rounded-lg text-lg">Add Client</Link>
              <Link to="/ClientList" className="bg-softblue hover:bg-accent2 text-white font-bold py-4 px-6 rounded-lg text-lg">Client List</Link>
          </div>
          <h1 className="text-center text-4xl mt-10 mb-8">Schedule View</h1>
          
          <div className="my-8">
              {/* First Row: Monday to Wednesday */}
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                  {weekDays.slice(0, 3).map((day, index) => (
                      <div key={index} 
                          className="cursor-pointer bg-neutraldark hover:bg-neutrallight text-white font-semibold py-3 px-6 border border-neutrallight rounded-lg shadow-lg text-lg"
                          onClick={() => handleDayClick(day)}>
                          {format(new Date(day), 'EEEE, MMMM d')}
                      </div>
                  ))}
              </div>
              {/* Second Row: Thursday to Sunday */}
              <div className="flex flex-col md:flex-row justify-center items-center mt-5 space-y-4 md:space-y-0 md:space-x-4">
                  {weekDays.slice(3).map((day, index) => (
                      <div key={index} 
                          className="cursor-pointer bg-neutraldark hover:bg-neutrallight text-white font-semibold py-3 px-6 border border-neutrallight rounded-lg shadow-lg text-lg"
                          onClick={() => handleDayClick(day)}>
                          {format(new Date(day), 'EEEE, MMMM d')}
                      </div>
                  ))}
              </div>
          </div>
          <div className="flex flex-col items-center space-y-4 mt-8 md:flex-row md:space-x-4 md:justify-center">
              <button
                  onClick={prevWeek}
                  className="bg-accent1 hover:bg-accent2 text-white font-bold py-3 px-8 rounded-lg transition duration-150 ease-in-out text-lg"
              >
                  Previous Week
              </button>
              <button
                  onClick={nextWeek}
                  className="bg-softblue hover:bg-accent2 text-white font-bold py-3 px-8 rounded-lg transition duration-150 ease-in-out text-lg"
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