// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Login.css'; // Import the CSS file

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = () => {
//         if (!username || !password) {  // Check if username or password is empty
//             alert('Username and password cannot be empty');
//             return;  // Exit the function if validation fails
//         }

//         axios.post('http://localhost:5000/api/auth/login', { username, password })
//             .then(response => {
//                 localStorage.setItem('token', response.data.token);
//                 navigate('/tasks'); // Redirect to tasks page
//             })
//             .catch(error => {
//                 console.error('There was an error logging in!', error);
//             });
//     };

//     return (
//         <div className="login-container">
//             <h2>Login</h2>
//             <input 
//                 type="text" 
//                 value={username} 
//                 onChange={(e) => setUsername(e.target.value)}
//                 placeholder="Username" 
//                 required
//             />
//             <input 
//                 type="password" 
//                 value={password} 
//                 onChange={(e) => setPassword(e.target.value)} 
//                 placeholder="Password" 
//                 required
//             />
//             <button onClick={handleLogin}>Login</button>
//         </div>
//     );
// };


// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!username || !password) {
            alert('Username and password cannot be empty');
            return;
        }

        axios.post('http://localhost:5000/api/auth/login', { username, password })
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate('/tasks'); // Redirect to tasks page
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" 
                required
            />
            <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
                required
            />
            <button onClick={handleLogin}>Login</button>
            <button 
                onClick={() => navigate('/register')} // Navigate to the Register component
                className="register-button"
            >
                Register
            </button>
        </div>
    );
};

export default Login;
