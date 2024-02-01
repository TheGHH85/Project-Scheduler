import React from "react";
import { Link } from "react-router-dom";



function MainPage(){
    return(
        <>
        <h1>Welcome Drey</h1>
        <Link to="/AddClient">Add Client</Link>
        <Link to="/ScheduleView">Schedule View</Link>
        </>
    );
}

export default MainPage;