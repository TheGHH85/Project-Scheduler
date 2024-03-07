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
            <Link to="/AddClient" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Client</Link>
            <Link to="/ScheduleView" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Schedule View</Link>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-900 my-8">Client List</h1>
       <div className="flex justify-center space-x-4">
        <table className="table-fixed">
            <thead>
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Owner</th>
                    <th className="px-4 py-2">Breed</th>
                    <th className="px-4 py-2">Email</th>
                </tr>
            </thead>
            <tbody>
                {clients.map((client=>(
                    <tr key={client._id}>
                        <td className="border px-4 py-2">{client.name}</td>
                        <td className="border px-4 py-2">{client.owner}</td>
                        <td className="border px-4 py-2">{client.breed}</td>
                        <td className="border px-4 py-2">{client.email}</td>
                    </tr>
                )))}
            </tbody>

        </table>
        </div>
        <Footer/>
        </>
    );

}
export default ClientList;