import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import '../css/index.css'; // Ensure your styles are imported
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';

function Upcoming() {
    const [week, setWeek] = useState(moment().format('YYYY-[W]WW'));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [classes, setClasses] = useState(initializeWeekDays());
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClassesAndClientsForWeek = async () => {
            setLoading(true);
            setError('');
            try {
                // Fetch classes for the week
                const classesResponse = await axios.get(`http://52.91.94.163:8080/classes/week/${encodeURIComponent(week)}`);
                const updatedClasses = { ...initializeWeekDays(), ...groupAndSortClasses(classesResponse.data) };
                setClasses(updatedClasses);

                // Fetch clients
                const clientsResponse = await axios.get('http://52.91.94.163:8080/clients');
                setClients(clientsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data.');
            } finally {
                setLoading(false);
            }
        };

        fetchClassesAndClientsForWeek();
    }, [week]);

    function initializeWeekDays() {
        const startOfWeek = moment().startOf('isoWeek');
        const days = {};
        for (let i = 0; i < 7; i++) {
            const day = moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD');
            days[day] = [];
        }
        return days;
    }

    function groupAndSortClasses(classes) {
        const grouped = classes.reduce((acc, curr) => {
            const date = moment(curr.date).format('YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(curr);
            return acc;
        }, {});

        Object.keys(grouped).forEach(date => {
            grouped[date].sort((a, b) => moment(a.time, 'HH:mm').diff(moment(b.time, 'HH:mm')));
        });

        return grouped;
    }

    return (
        <>
        <HeaderNav />
        <div className="flex flex-col min-h-screen text-primarytext">
            <div className="flex-grow">
                <h2 className='text-center mt-5 text-3xl'>Classes for the Week {moment(week, 'YYYY-[W]WW').format('WW, YYYY')}</h2>
                {loading && <p className="text-center">Loading...</p>}
                {error && <div className="text-red-500 text-center">{error}</div>}
                <div className="grid grid-cols-7 gap-4 p-5">
                    {Object.entries(classes).sort(([a], [b]) => moment(a).diff(moment(b))).map(([date, dayClasses], index) => (
                        <div key={index} className="bg-softblue text-white p-2 rounded-lg shadow-lg flex flex-col">
                            <h3 className="text-xl font-bold text-center">{moment(date).format('dddd')}</h3>
                            <ul className="mt-2">
                                {dayClasses.length > 0 ? dayClasses.map((classObj, classIndex) => (
                                    <li key={classIndex} className="bg-neutraldark p-2 rounded mt-2 shadow">
                                        <div className="text-center">
                                        <p className="font-bold">Class: {classObj.classType} </p> 
                                        <p>instructor: {classObj.instructor}</p>
                                        <p>Time: {classObj.time}</p>
                                        <p>Description: {classObj.description}</p>
                                        {/* Display clients for this class */}
                                        <div>
                                            <strong>Clients:</strong>
                                            <ul>
                                                {clients.map(client => (
                                                    <li key={client._id}>{client.name}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </li>
                                )) : <p className="text-center mt-2">No classes</p>}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Upcoming;
