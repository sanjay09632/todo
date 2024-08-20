import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css'; 

const TaskForm = ({ setTasks }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');

    const handleCreateTask = () => {
        const token = localStorage.getItem('token');

        axios.post('http://localhost:5000/api/tasks', {
            title, description, assigned_to: assignedTo
        }, {
            headers: { 'x-access-token': token }
        })
            .then(response => {
                setTasks(prevTasks => [...prevTasks, response.data]);
                setTitle('');
                setDescription('');
                setAssignedTo('');
            })
            .catch(error => {
                console.error('There was an error creating the task!', error);
            });
    };

    return (
        <div className="task-form-container">
            <h2>Create Task</h2>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Title" 
            />
            <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Description"
            ></textarea>
            <input 
                type="text" 
                value={assignedTo} 
                onChange={(e) => setAssignedTo(e.target.value)} 
                placeholder="Assign to (User ID)" 
            />
            <button onClick={handleCreateTask}>Create Task</button>
        </div>
    );
};

export default TaskForm;



