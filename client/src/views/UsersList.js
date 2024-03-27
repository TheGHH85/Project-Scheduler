import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../css/index.css';
import HeaderNav from '../components/navbar';
import Footer from '../components/footer';
import UpdateUserModal from '../components/updateUserModal';

function UsersList()  {
    const [editingUsers, setEditingUsers] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://52.91.94.163:8080/users')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleSave = (updatedUser) => {
        // Ensure updatedUser includes the ID and any fields you want to update
        axios.put(`http://52.91.94.163:8080/users/${updatedUser._id}`, updatedUser)            .then(response => {
                // Refresh the user list to reflect the changes
                axios.get('http://52.91.94.163:8080/users')
                    .then(response => {
                        setUsers(response.data);
                        setEditingUsers(null); // Close the modal
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.error("Error updating user:", error);
                // Handle error (e.g., show an error message)
            });
    };
    

    return (
        <>
            <HeaderNav />
         
            <h1 className="text-3xl font-bold text-center text-primarytext my-8">Users List</h1>
            <div className="flex justify-center">
                <div className="max-w-6xl w-full px-4"> {/* Adjust the max-width as needed and apply padding */}
                    <table className="w-full table-auto text-primarytext">
                    <thead className="bg-neutraldark text-white">
    <tr>
        <th className="px-4 py-2 border border-neutrallight">Name</th>
        <th className="px-4 py-2 border border-neutrallight">Role</th>
        <th className="px-4 py-2 border border-neutrallight">Actions</th>
    </tr>
</thead>

                        <tbody className="bg-neutraldark text-white">
    {users.map((users) => (
        <tr key={users._id} className="hover:bg-neutrallight hover:text-neutraldark">
            <td className="border px-4 py-2 border-neutrallight">{users.username}</td>
            <td className="border px-4 py-2 border-neutrallight">{users.role}</td>
            <td className="border px-4 py-2 border-neutrallight flex justify-around">
            <button onClick={() => setEditingUsers(users)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
  Update
</button>
            </td>
        </tr>
    ))}
</tbody>

                    </table>
                    <UpdateUserModal
    isOpen={!!editingUsers}
    onClose={() => setEditingUsers(null)}
    users={editingUsers}
    onSave={handleSave}
/>
                </div>
            </div>
            <Footer />
        </>
    );
}
export default UsersList;