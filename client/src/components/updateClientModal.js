import React, { useEffect, useState } from "react";

function UpdateClientModal({ isOpen, onClose, client, onSave }) {

  const [formData, setFormData] = useState({...client});


  useEffect(() => {
    setFormData({...client});
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-darkblue p-5 rounded-lg shadow-lg max-w-md w-full" onClick={e => e.stopPropagation()}>
        <h2 className="font-semibold text-lg mb-4 text-white">Update Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-primarytext">Name</label>
            <input
              id="name"
              className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm rounded-md bg-neutraldark text-white"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="breed" className="block text-sm font-medium text-primarytext">Breed</label>
            <input
              id="breed"
              className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm rounded-md bg-neutraldark text-white"
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primarytext">Email</label>
            <input
              id="email"
              className="mt-1 block w-full p-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm rounded-md bg-neutraldark text-white"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-primarytext">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-softblue focus:border-softblue sm:text-sm rounded-md bg-neutraldark text-white"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-primarytext bg-neutraldark hover:bg-neutrallight">
              Close
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent1 hover:bg-accent2">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateClientModal;
