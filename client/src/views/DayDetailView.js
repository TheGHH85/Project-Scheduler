import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddClassModal from '../components/AddClass';
import axios from 'axios';

const DayDetailView = () => {
    const { date } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [classes, setClasses] = useState([]);

    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) {
            // If the date is invalid, return null or an appropriate fallback
            return null;
        }
        let month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;

        return [year, month, day].join('-');
    };

    const fetchClasses = async () => {
        const formattedDate = formatDate(date); // Move inside function
        if (!formattedDate) {
            console.error("Invalid date format:", date);
            return; // Early return if the date is invalid
        }
        try {
            const response = await axios.get(`http://localhost:8080/classes/${encodeURIComponent(formattedDate)}`);
            setClasses(response.data);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };

    useEffect(() => {
        console.log("Fetching classes for date:", date);
        fetchClasses();
    }, [date]); // Dependency on `date`, not `formattedDate`

    const handleAddClassClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const refreshClasses = () => {
        fetchClasses();
        setShowModal(false);
    };

    return (
        <div>
            <h2>Classes for {date}</h2>
            {classes.map((cls, index) => (
                <div key={index}>{cls.classType} - {cls.instructor} {cls.time}</div>
            ))}
            <button onClick={handleAddClassClick}>Add Class</button>
            {showModal && <AddClassModal date={date} onClose={handleCloseModal} refreshClasses={refreshClasses} />}
        </div>
    );
};

export default DayDetailView;
