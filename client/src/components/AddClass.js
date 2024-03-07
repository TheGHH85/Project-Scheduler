import React, {useState} from "react";
import axios from "axios";
import '../css/index.css';

const AddClass = ({date, onClose, refreshClasses}) => {
    const [instructor, setInstructor] = useState('');
    const [classType, setClassType] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
        await axios.post('http://localhost:8080/classes/add-class', {date, instructor, classType, time});
        setInstructor('');
        setClassType('');
        setTime('');
        onClose();
        refreshClasses();
    } catch (error){
        console.log(error);
    }

};

return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}> {/* Overlay */}
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-darkblue" onClick={e => e.stopPropagation()}> {/* Prevent click inside the modal from closing it */}
      <form onSubmit={handleSubmit} className="space-y-4 text-white">
        <h2 className="text-lg font-bold text-center">Add Class for {date}</h2>
        <input
          type="text"
          value={instructor}
          placeholder="Instructor"
          onChange={(e) => setInstructor(e.target.value)}
          required
          className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-softblue bg-neutraldark text-white"
        />
        <input
          type="text"
          value={classType}
          placeholder="Class Type"
          onChange={(e) => setClassType(e.target.value)}
          required
          className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-softblue bg-neutraldark text-white"
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
          className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-softblue bg-neutraldark text-white"
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-accent1 hover:bg-accent2 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-neutraldark hover:bg-neutrallight text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
);


};

export default AddClass;