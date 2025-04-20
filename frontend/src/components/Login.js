import React, { useState } from 'react';
import { login } from '../api';

function Login({ setToken, setRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const token = await login(username, password);
            setToken(token);
            localStorage.setItem('token', token);
            // Fetch role after login
            const roleResponse = await fetch('http://localhost:8080/api/auth/role', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userRole = await roleResponse.text();
            setRole(userRole);
            localStorage.setItem('role', userRole);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md">
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    className="border p-2 mb-2 w-full"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 mb-2 w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded w-full">
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;