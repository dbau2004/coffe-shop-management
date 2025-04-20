import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated, setUserRole }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
  try {
    const response = await fetch("http://backend:8080/api/auth/login", {  // gọi bằng tên service "backend"
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "user1",
        password: "123456"
      })
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Login failed:", error);
  }
};


    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Đăng nhập</h2>
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
                <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">Đăng nhập</button>
            </div>
        </div>
    );
}

export default Login;