import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Đổi localhost thành backend
            await axios.post('http://backend:8080/api/auth/register', { username, password });
            alert('Đăng ký thành công');
            navigate('/login');
        } catch (error) {
            alert('Đăng ký thất bại');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Đăng ký</h2>
                <input
                    type="text"
                    placeholder="Tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4 w-full"
                />
                <button onClick={handleRegister} className="bg-blue-500 text-white p-2 w-full">Đăng ký</button>
            </div>
        </div>
    );
}

export default Register;
