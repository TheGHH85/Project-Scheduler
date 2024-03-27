import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddClassModal from '../components/AddClass';
import SelectClientModal from '../components/SelectClientModal';
import { Link } from 'react-router-dom';
import '../css/index.css';
import axios from 'axios';
import HeaderNav from '../components/navbar';
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
            const response = await axios.get(`http://52.91.94.163:8080/classes/${encodeURIComponent(date)}`);
            setClasses(response.data);
        } catch (error) {
            console.error("Failed to fetch classes:", error);
        }
    };
    
    
    

    const fetchClients = async () => {
        console.log('Fetching classes...');
        try {
            const response = await axios.get('http://52.91.94.163:8080/clients');
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

    const handleDeleteClientFromFutureClasses = async (clientId, classStartDate, classId) => {
      if (window.confirm("Are you sure you want to remove this client from this and all future classes?")) {
        try {
          await axios.post(`http://52.91.94.163:8080/classes/remove-client`, {
            clientId,
            startDate: classStartDate,
            classId, // Include classId if it's being used in your logic
          });
          refreshClasses(); // Refresh classes to reflect the change
        } catch (error) {
          console.error("Failed to delete client from future classes:", error);
        }
      }
    };
    
    
    

    const handleClientSelected = async (clientId, clientName) => {
        try {
            const url = `http://52.91.94.163:8080/classes/${currentClassId}/add-client`;
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
   

    return (
        <div className="flex flex-col min-h-screen text-primarytext">
          <div className="flex-grow pb-16">
          <HeaderNav />
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
              {['Puppy', 'Advanced', 'Rally', 'Other'].map((classType) => (
                <div key={classType} className={`bg-softblue text-white text-center p-5 overflow-auto rounded-lg md:flex-1`}>
                  <h3 className="text-xl font-bold">{classType}</h3>
                  {classes.filter(cls => cls.classType === classType)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((cls, index) => (
                      <div key={cls._id} className="my-2 p-2 bg-neutraldark text-white rounded shadow">
                        <div className="border-2 border-accent4 text-lg bg-accent3 rounded pt-2 pb-4 shadow">
                        <p>{cls.instructor} at {cls.time}</p>
                        <p>Start Date: {cls.startDate}</p>
                        <p>End Date: {cls.endDate}</p>
                        {cls.classType === 'Other' && <p>Description: {cls.description}</p>}
                        </div>
                        {cls.clients && cls.clients.length > 0 && (
                          <ul className="mt-2 text-primarytext">
                            <p>Clients:</p>
                            {cls.clients.map(client => (
                              <li key={client._id}>
                              <span   className="cursor-pointer hover:text-red-500"
 onClick={() => handleDeleteClientFromFutureClasses(client._id, date, cls._id)}>{client.name}</span>
                             
                            
                              </li>
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
