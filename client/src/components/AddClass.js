import React, {useState} from "react";
import axios from "axios";
import '../css/AddClass.css';

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
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <h2>Add Class for {date}</h2>
        <input type="text" value={instructor} placeholder="Instructor" onChange={(e) => setInstructor(e.target.value)} required />
        <input type="text" value={classType} placeholder="Class Type" onChange={(e) => setClassType(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddClass;