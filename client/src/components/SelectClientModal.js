import React from 'react';

function SelectClientModal({ isOpen, onClose, clients, onClientSelected }) {
  // Prevent the modal from rendering if it's not open
  if (!isOpen) return null;

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from actually submitting
    const clientId = event.target.client.value; // Get the selected client ID from the form
    onClientSelected(clientId); // Pass the selected client ID to the parent component
    onClose(); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h2 className="font-semibold text-lg mb-4">Select a Client</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700">Client</label>
            <select id="client" name="client" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
              <option value="">Select a client</option>
              {clients.map(client => (
                <option key={client._id} value={client._id}>{client.name}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SelectClientModal;
