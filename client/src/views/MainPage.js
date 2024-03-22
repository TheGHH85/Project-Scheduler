import React from "react";
import { Link } from "react-router-dom";
import '../css/index.css';
import Header from '../components/header';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
function MainPage(){


    return(
        <>
            <Header />
            <h1 className="text-3xl font-bold text-center text-primarytext my-8">Please select one of the options below </h1>
            
            <div className="flex flex-col items-center justify-center md:flex-row md:space-x-4 bg-darkblue p-8 rounded-lg mx-auto">
                <Link to="/AddClient" className="bg-accent1 hover:bg-accent2 text-white text-center rounded flex flex-col justify-center items-center w-full md:w-72 h-56 mb-4 md:mb-0">
                    <p className="font-bold text-xl">Add Client</p>
                    <p>Add new clients here!</p>
                </Link>
                <Link to="/ScheduleView" className="bg-softblue hover:bg-accent2 text-white text-center rounded flex flex-col justify-center items-center w-full md:w-72 h-56 mb-4 md:mb-0">
                    <p className="font-bold text-xl">Schedule View</p>
                    <p>Click here to schedule classes.</p>
                </Link>
                <Link to="/ClientList" className="bg-neutraldark hover:bg-accent2 text-white text-center rounded flex flex-col justify-center items-center w-full md:w-72 h-56">
                    <p className="font-bold text-xl">Client List</p>
                    <p>Click here to view all the clients.</p>
                </Link>
                <Link to="/UsersList" className="bg-softblue hover:bg-accent2 text-white text-center rounded flex flex-col justify-center items-center w-full md:w-72 h-56">
                    <p className="font-bold text-xl">Users</p>
                    <p>Click here to view all the users.</p>
                </Link>
            </div>
    
            <Footer />
        </>
    );
    
    
    
}

export default MainPage;