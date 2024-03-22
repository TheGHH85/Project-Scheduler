import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/index.css';
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';
import UpdateClientModal from '../components/updateClientModal';

function ClientList()  {
    const [editingClient, setEditingClient] = useState(null);

    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/clients')
        .then(response => {
            setClients(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/clients/${id}`)
        .then(() => {
            // After deleting, filter out the deleted client from the clients state
            const updatedClients = clients.filter(client => client._id !== id);
            setClients(updatedClients);
            alert("Client deleted successfully");
        })
        .catch(error => {
            console.error("There was an error deleting the client:", error);
        });
    };

    const handleSave = (updatedClient) => {
        axios.put(`http://localhost:8080/clients/${updatedClient._id}`, updatedClient)
            .then(() => {
                // Optionally: Refresh the client list from the server or update the state directly
                setEditingClient(null); // Close the modal
            })
            .catch(error => {
                console.error("Error updating client:", error);
                // Handle error (e.g., show an error message)
            });
    };
    
    

    return (
        <>
            <HeaderNav />
            <div className="flex justify-center space-x-4 mt-5">
                <Link to="/AddClient" className="bg-accent1 hover:bg-accent2 text-white font-bold py-2 px-4 rounded">Add Client</Link>
                <Link to="/ScheduleView" className="bg-softblue hover:bg-lightgrey text-white font-bold py-2 px-4 rounded">Schedule View</Link>
            </div>
            <h1 className="text-3xl font-bold text-center text-primarytext my-8">Client List</h1>
            <div className="flex justify-center">
                <div className="max-w-6xl w-full px-4"> {/* Adjust the max-width as needed and apply padding */}
                    <table className="w-full table-auto text-primarytext">
                    <thead className="bg-neutraldark text-white">
    <tr>
        <th className="px-4 py-2 border border-neutrallight">Name</th>
        <th className="px-4 py-2 border border-neutrallight">Owner</th>
        <th className="px-4 py-2 border border-neutrallight">Breed</th>
        <th className="px-4 py-2 border border-neutrallight">Email</th>
        <th className="px-4 py-2 border border-neutrallight">Status</th>
        <th className="px-4 py-2 border border-neutrallight">Actions</th>
    </tr>
</thead>

                        <tbody className="bg-neutraldark text-white">
    {clients.map((client) => (
        <tr key={client._id} className="hover:bg-neutrallight hover:text-neutraldark">
            <td className="border px-4 py-2 border-neutrallight">{client.name}</td>
            <td className="border px-4 py-2 border-neutrallight">{client.owner}</td>
            <td className="border px-4 py-2 border-neutrallight">{client.breed}</td>
            <td className="border px-4 py-2 border-neutrallight">{client.email}</td>
            <td className="border px-4 py-2 border-neutrallight">{client.status}</td>
            <td className="border px-4 py-2 border-neutrallight flex justify-around">
            <button onClick={() => setEditingClient(client)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
  Update
</button>
                <button onClick={() => handleDelete(client._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                    <UpdateClientModal
    isOpen={!!editingClient}
    onClose={() => setEditingClient(null)}
    client={editingClient}
    onSave={handleSave}
/>
                </div>
            </div>
            <Footer />
        </>
    );
    
    

}
export default ClientList;