import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './TaskList.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [isAdminOrManager, setIsAdminOrManager] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:5000/api/tasks', {
            headers: { 'x-access-token': token }
        })
            .then(response => {
                setTasks(response.data);
                const userRole = JSON.parse(atob(token.split('.')[1])).role;
                setIsAdminOrManager(userRole === 'Admin' || userRole === 'Manager');
            })
            .catch(error => {
                console.error('There was an error fetching the tasks!', error);
            });
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:5000/api/tasks/${id}`, {
            headers: { 'x-access-token': token }
        })
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the task!', error);
            });
    };

    return (
        <div className="task-list-container">
            <h2>Task List</h2>
            {isAdminOrManager && <TaskForm setTasks={setTasks} />}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        {/* <p>Status: {task.status}</p> */}
                        {isAdminOrManager && <button onClick={() => handleDelete(task.id)}>Delete</button>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
