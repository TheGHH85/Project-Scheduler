import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import '../css/index.css';
import Header from '../components/header';
import Footer from '../components/footer';

function AddClient(){
const navigate = useNavigate();
const [formData, setFormData] = useState({

    name: '',
    owner: '',
    breed: '',
    email: ''
});

const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8080/add-client', formData);
    alert('Client Added sucessfully!');
    setFormData({
        name: '',
        owner: '',
        breed: '',
        email: ''
    });

    navigate('/');
};

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Client Page</h1>
          <form
            className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
            onSubmit={handleSubmit}
          >
                    <label className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
          
                    <label className="block text-sm font-medium text-gray-700">
                      Owner:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                    />
          
                    <label className="block text-sm font-medium text-gray-700">
                      Breed:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                      <div className="flex justify-between space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Client
            </button>
            <Link to="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel</Link>
          </div>
        </form>
      </div>
    </main>
    <Footer className="mt-auto">
    </Footer>
  </div>
   
    );
}

export default AddClient;