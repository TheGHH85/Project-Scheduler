import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/index.css';
import Header from '../components/header';
import Footer from '../components/footer';

function ClientList()  {
    
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

    return (
        <>
            <Header />
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
                            </tr>
                        </thead>
                        <tbody className="bg-neutraldark text-white">
                            {clients.map((client => (
                                <tr key={client._id} className="hover:bg-neutrallight hover:text-neutraldark">
                                    <td className="border px-4 py-2 border-neutrallight">{client.name}</td>
                                    <td className="border px-4 py-2 border-neutrallight">{client.owner}</td>
                                    <td className="border px-4 py-2 border-neutrallight">{client.breed}</td>
                                    <td className="border px-4 py-2 border-neutrallight">{client.email}</td>
                                </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
    
    

}
export default ClientList;