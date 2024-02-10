import React, { useState } from "react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
import { useNavigate } from "react-router-dom";
import "../css/ScheduleView.css";

function ScheduleView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate();

    const prevWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const nextWeek = () => setCurrentDate(addWeeks(currentDate, 1));

    // Update format here to 'yyyy-MM-dd' for compatibility
    const weekDays = Array.from({ length: 7 }).map((_, index) =>
        format(addDays(startOfWeek(currentDate), index), 'yyyy-MM-dd'));
    

    const handleDayClick = (date) => {
        // Ensure navigation uses the updated format
        navigate(`/DayDetailView/${date}`);
    }

    return (
        <>
            <h1>Schedule View</h1>
            <button onClick={prevWeek}>Previous Week</button>
            <button onClick={nextWeek}>Next Week</button>
            <div className="week-container">
                {weekDays.map((day, index) => (
                    <div key={index} className="day-box" onClick={() => handleDayClick(day)}>
                        {format(new Date(day), 'EEEE, MMMM d')} {/* Display in readable format but navigate with 'yyyy-MM-dd' */}
                    </div>
                ))}
            </div>
        </>
    );
}

export default ScheduleView;
