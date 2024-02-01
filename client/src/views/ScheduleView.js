import React, { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
import { useNavigate } from "react-router-dom";
import "../css/ScheduleView.css";

function ScheduleView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate(); 
    // Corrected to use currentDate and setCurrentDate
    const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

    const weekDays = Array.from({ length: 7 }).map((_, index) =>
        format(addDays(startOfWeek(currentDate), index), 'EEEE, MMMM d'));
    

    const handleDayClick = (date) => {
        navigate(`/ScheduleView/${date}`);
    }

    return (
        <>
            <h1>Schedule View</h1>
            <button onClick={prevWeek}>Previous Week</button>
            <button onClick={nextWeek}>Next Week</button>
            <div className="week-container">
                {weekDays.map((day, index) => (
                    <div key={index} className="day-box" onClick={() => handleDayClick(day) }>
                        {day}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ScheduleView;
