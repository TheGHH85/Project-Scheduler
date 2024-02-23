import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddClassModal from '../components/AddClass';
import SelectClientModal from '../components/SelectClientModal';
import '../css/index.css';
import axios from 'axios';

const DayDetailView = () => {
    const { date } = useParams();
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);
    const [classes, setClasses] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClasses();
        fetchClients();
    }, [date]);

    const fetchClasses = async () => {
        const formattedDate = formatDate(date);
        if (!formattedDate) {
            console.error("Invalid date format:", date);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/classes/${encodeURIComponent(formattedDate)}`);
            setClasses(response.data);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };

    const fetchClients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/clients');
            setClients(response.data);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
        }
    };

    const handleAddClassClick = () => setShowAddClassModal(true);
    const handleCloseAddClassModal = () => setShowAddClassModal(false);

    const handleAddClientToClass = (classId) => {
        setCurrentClassId(classId);
        setShowClientModal(true);
    };

    const handleClientSelected = async (clientId) => {
        try {
            const url = `http://localhost:8080/classes/${currentClassId}/add-client`;
            await axios.post(url, { clientId });
            await fetchClasses();
            setShowClientModal(false);
        } catch (error) {
            console.error("Failed to add client to class:", error);
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        let month = `${d.getMonth() + 1}`.padStart(2, '0');
        let day = `${d.getDate()}`.padStart(2, '0');
        return [d.getFullYear(), month, day].join('-');
    };

    const refreshClasses = () => {
        fetchClasses();
        setShowAddClassModal(false);
    };
    const getColorClass = (classType) => {
        switch (classType) {
          case 'Class A':
            return 'bg-blue-500';
          case 'Class B':
            return 'bg-red-500';
          case 'Class C':
            return 'bg-green-500';
          default:
            return '';
        }
    };

    return (
        <div>
            <h2>Classes for {date}</h2>
            <button onClick={handleAddClassClick} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Class
            </button>
            {showAddClassModal && <AddClassModal date={date} onClose={handleCloseAddClassModal} refreshClasses={refreshClasses} />}
            
            <div className="flex flex-row items-start justify-center h-screen">
                {['Class A', 'Class B', 'Class C'].map((classType) => (
                    <div key={classType} className={`flex-1 text-center ${getColorClass(classType)} text-white p-5 overflow-auto rounded-lg`}>
                        <h3 className="text-xl font-bold">{classType}</h3>
                        {classes.filter(cls => cls.classType === classType)
                            .sort((a, b) => a.time.localeCompare(b.time))
                            .map((cls, index) => (
                                console.log('Classes found with client deatils:', cls), // Debugging
                                <div key={cls._id} className="my-2 p-2 bg-white text-black rounded shadow"> {/* Ensure unique key here */}
                                    <p>{cls.classType} - {cls.instructor} at {cls.time}</p>
                                    {/* Render client names if available */}
                                    {cls.clients && cls.clients.length > 0 && (
                                      <ul className="mt-2">
                                        {cls.clients.map(client => (
                                          <li key={client._id}>{client.name}</li> // Assuming client details are populated
                                        ))}
                                      </ul>
                                    )}
                                    <button onClick={() => handleAddClientToClass(cls._id)} className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                        Add Client
                                    </button>
                                </div>
                        ))}
                    </div>
                ))}
            </div>
    
            {showClientModal && <SelectClientModal isOpen={showClientModal} onClose={() => setShowClientModal(false)} clients={clients} onClientSelected={handleClientSelected} />}
        </div>
    );
    
};
      
export default DayDetailView;
