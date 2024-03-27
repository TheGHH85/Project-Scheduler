import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';
import '../css/index.css';

function ScheduleView() {
  const [scheduledDates, setScheduledDates] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/scheduled-dates')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched scheduled dates:", data); // Debugging line
        setScheduledDates(data);
      })
      .catch(error => console.error('Error fetching scheduled dates:', error));
  }, []);
  

  const isClassScheduled = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    console.log("Checking date:", formattedDate); // Debugging line
    console.log("Scheduled dates:", scheduledDates); // Debugging line
    return scheduledDates.includes(formattedDate);
  };
  return (
    <div>
      <HeaderNav />
      <div>Debug: Scheduled Dates - {JSON.stringify(scheduledDates)}</div> {/* Debugging line */}
      <Calendar 
        tileClassName={({ date, view }) => 
          view === 'month' && isClassScheduled(date) ? 'scheduled-class' : null
        }
      />
      <Footer />
    </div>
  );
}

export default ScheduleView;
