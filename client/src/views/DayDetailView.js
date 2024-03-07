import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddClassModal from '../components/AddClass';
import SelectClientModal from '../components/SelectClientModal';
import { Link } from 'react-router-dom';
import '../css/index.css';
import axios from 'axios';
import Header from '../components/header';
import Footer from '../components/footer';


const DayDetailView = () => {
    const { date } = useParams();
    console.log('Date at the start of DayDetailView:', date); // Debugging
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);
    const [currentClassId, setCurrentClassId] = useState(null);
    const [classes, setClasses] = useState([]);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        console.log('Fetching classes and clients...');
        fetchClasses(date);
        fetchClients();
    }, [date]);

   
    

    const fetchClasses = async (date) => {
        try {
            // Fetch classes for the current date only
            const response = await axios.get(`http://localhost:8080/classes/${encodeURIComponent(date)}`);
            setClasses(response.data);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    
    
    

    const fetchClients = async () => {
        console.log('Fetching classes...');
        try {
            const response = await axios.get('http://localhost:8080/clients');
            setClients(response.data);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
        }
        console.log('Clients:', clients);
    };

    const handleAddClassClick = () => setShowAddClassModal(true);
    const handleCloseAddClassModal = () => setShowAddClassModal(false);

    const handleAddClientToClass = (classId) => {
        setCurrentClassId(classId);
        setShowClientModal(true);
    };

    const handleClientSelected = async (clientId, clientName) => {
        try {
            const url = `http://localhost:8080/classes/${currentClassId}/add-client`;
            const response = await axios.post(url, { clientId });
            // Optionally verify the response before updating the state
    
            // Use a callback to ensure we're working with the most up-to-date state
            setClasses(currentClasses => {
                return currentClasses.map(cls => {
                    if (cls._id === currentClassId) {
                        // Assuming you get the client's ID and name, adjust based on your data structure
                        const newClient = { _id: clientId, name: clientName };
                        const updatedClients = [...cls.clients, newClient];
                        return { ...cls, clients: updatedClients };
                    }
                    return cls;
                });
            });
            
            setShowClientModal(false); // Assuming you want to close the modal on success
        } catch (error) {
            console.error("Failed to add client to class:", error);
        }
        refreshClasses();
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
        <div className="flex flex-col min-h-screen bg-darkblue text-primarytext">
          <div className="flex-grow pb-16">
            <Header />
            <div className="flex justify-center mt-5 md:space-x-4">
              <Link to="/ScheduleView" className="bg-softblue hover:bg-lightgrey text-white font-bold py-2 px-4 rounded">Weekly View</Link>
            </div>
            <h2 className='text-center mt-5 text-3xl'>Classes for {date}</h2>
            <h3 className='text-center mt-5 text-bold text-xl'>*Please refresh the page after you add a class or client*</h3>
      
            <div className="flex justify-center mt-5">
              <button onClick={handleAddClassClick} className="flex items-center bg-accent1 hover:bg-accent2 text-white font-bold py-4 px-8 rounded">Add Class</button>
            </div>
            {showAddClassModal && <AddClassModal date={date} onClose={handleCloseAddClassModal} refreshClasses={refreshClasses} />}
      
            <div className="flex flex-col space-y-4 items-center mt-5 md:flex-row md:space-y-0 md:space-x-4 md:justify-center md:items-start">
              {['Class A', 'Class B', 'Class C'].map((classType) => (
                <div key={classType} className={`bg-softblue text-white p-5 overflow-auto rounded-lg md:flex-1`}>
                  <h3 className="text-xl font-bold">{classType}</h3>
                  {classes.filter(cls => cls.classType === classType)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((cls, index) => (
                      <div key={cls._id} className="my-2 p-2 bg-neutraldark text-white rounded shadow">
                        <p>{cls.classType} - {cls.instructor} at {cls.time}</p>
                        {cls.clients && cls.clients.length > 0 && (
                          <ul className="mt-2 text-primarytext">
                            {cls.clients.map(client => (
                              <li key={client._id}>{client.name}</li>
                            ))}
                          </ul>
                        )}
                        <button onClick={() => handleAddClientToClass(cls._id)} className="mt-2 bg-accent1 hover:bg-accent2 text-white font-bold py-1 px-2 rounded">
                          Add Client
                        </button>
                      </div>
                  ))}
                </div>
              ))}
            </div>
      
            {showClientModal && <SelectClientModal isOpen={showClientModal} onClose={() => setShowClientModal(false)} clients={clients} onClientSelected={handleClientSelected} />}
          </div>
          <Footer />
        </div>
      );
      
    
    
};
      
export default DayDetailView;
