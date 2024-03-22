import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import '../css/index.css';
import Footer from '../components/footer';
import HeaderNav from '../components/navbar';
function AddClient(){
const navigate = useNavigate();
const [formData, setFormData] = useState({

    name: '',
    owner: '',
    breed: '',
    email: '',
    status: ''
});

const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8080/add-client', formData);
    alert('Client Added sucessfully!');
    setFormData({
        name: '',
        owner: '',
        breed: '',
        email: '',
        status: ''
    });

    navigate('/ClientList');
};

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name]: value });
  console.log(formData)
};

  return (
    <div className="flex flex-col min-h-screen">
    <div className="flex-grow pb-16">
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-grow">
        <div className="flex flex-col items-center justify-center py-6">
          <h1 className="text-2xl font-bold text-primarytext mb-6">Add Client</h1>
          <form
            className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg"
            onSubmit={handleSubmit}
          >
                    <label className="block text-sm font-medium text-gray-700">
                      Owner Name:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                    />
                    <label className="block text-sm font-medium text-gray-700">
                      Dog Name:
                    </label>
                    <input
                      className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="text"
                      name="name"
                      value={formData.name}
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
                    <label className="block text-sm font-medium text-gray-700">
  Status:
</label>
<select
  name="status"
  value={formData.status}
  onChange={handleChange}
  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select Status</option> {/* Ensure there's a default option or remove it based on your needs */}
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>


                      <div className="flex justify-between space-x-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Client
            </button>
            <Link to="/MainPage"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel</Link>
          </div>
        </form>
      </div>
    </main>
    </div>
    <Footer className="mt-auto">
    </Footer>
    </div>
  </div>
   
    );
}

export default AddClient;