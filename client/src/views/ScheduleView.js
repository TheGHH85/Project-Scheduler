import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles, customize as needed
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';
import '../css/index.css'; // Ensure your custom styles are being imported
import { format } from 'date-fns';


function ScheduleView() {
    const navigate = useNavigate();

    // Function to handle day click
    const handleDayClick = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd'); // Format the selected date
        navigate(`/DayDetailView/${formattedDate}`); // Navigate to day detail view
    };

    return (
        <div className="flex flex-col min-h-screen text-primarytext">
            <HeaderNav />
            <div className="flex-grow">
                <h1 className="text-center text-4xl mt-10">Schedule View</h1>
                <div className="flex justify-center mt-10">
                    <Calendar 
                        onClickDay={handleDayClick} // Use Calendar's onClickDay prop
                        className="react-calendar " // Use for custom styling if needed
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ScheduleView;
