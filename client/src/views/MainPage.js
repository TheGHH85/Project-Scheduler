import React from "react";
import { Link } from "react-router-dom";
import '../css/index.css';
import Header from '../components/header';
import Footer from '../components/footer';

function MainPage(){



    return(
        <>
       <Header />
        <h1 className="text-3xl font-bold text-center text-gray-900 my-8">Scheduler </h1>
        
        <div className="flex justify-center space-x-4">
            <Link to="/AddClient" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Client</Link>
            <Link to="/ScheduleView" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Schedule View</Link>
            <Link to="/ClientList" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Client List</Link>
        </div>
<Footer />
    </>
    
    );
}

export default MainPage;