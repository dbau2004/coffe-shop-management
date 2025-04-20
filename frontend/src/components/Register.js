import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Thêm trạng thái loading
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("Tên người dùng và mật khẩu không thể để trống.");
            return;
        }

        setLoading(true); // Bắt đầu quá trình loading
        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
            await axios.post(`${apiUrl}/api/auth/register`, { username, password });
            alert('Đăng ký thành công');
            navigate('/login'); // Điều hướng đến trang đăng nhập
        } catch (error) {
            console.error('Đăng ký thất bại:', error);

            if (error.response) {
                // Hiển thị lỗi từ server nếu có
                alert(`Đăng ký thất bại: ${error.response.data.message || 'Vui lòng thử lại.'}`);
            } else if (error.request) {
                // Nếu không nhận được phản hồi từ server
                alert('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
            } else {
                // Lỗi khác
                alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.');
            }
        } finally {
            setLoading(false); // Kết thúc quá trình loading
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
                    disabled={loading} // Vô hiệu hóa khi đang loading
                />
                <input
                    type="password"
                    placeholder="Mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 mb-4 w-full"
                    disabled={loading} // Vô hiệu hóa khi đang loading
                />
                <button
                    onClick={handleRegister}
                    className={`p-2 w-full ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                    disabled={loading} // Vô hiệu hóa nút khi đang loading
                >
                    {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>
            </div>
        </div>
    );
}

export default Register;