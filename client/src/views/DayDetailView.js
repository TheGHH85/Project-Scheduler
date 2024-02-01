import React, { useState, useEffect } from 'react'; // Import useEffect
import { useParams } from 'react-router-dom';
import AddClassModal from '../components/AddClass';
import axios from 'axios';



const DayDetailView = () => {
    const { date } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/classes/${encodeURIComponent(date)}`);      setClasses(response.data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      // Handle error appropriately in the UI
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [date]); // Call fetchClasses on component mount and whenever date changes

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
      {/* Example of displaying classes */}
      {classes.map((cls, index) => (
        <div key={index}>{cls.classType} - {cls.instructor}</div>
      ))}
      <button onClick={handleAddClassClick}>Add Class</button>
      {showModal && <AddClassModal date={date} onClose={handleCloseModal} refreshClasses={refreshClasses} />}
    </div>
  );
};

export default DayDetailView;
