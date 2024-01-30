import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function AddClient(){
const navigate = useNavigate();
const [formData, setFormData] = useState({

    name: '',
    owner: '',
    breed: ''
});

const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8080/add-client', formData);
    alert('Client Added sucessfully!');
    setFormData({
        name: '',
        owner: '',
        breed: ''
    });

    navigate('/');
};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    return(
        <>
        <h1>Add Client Page</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                </label>
                <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                />
                <label>
                    Owner:
                </label>
                <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                />
                <label>
                    Breed:
                </label>
                <input
                type="text"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                />
                <button type="submit">Add Client</button>
            </form>
        </>
    );
}

export default AddClient;