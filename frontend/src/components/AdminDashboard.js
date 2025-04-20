import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'USER' });
    const [updateRole, setUpdateRole] = useState({ id: '', role: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://backend:8080/api/admin/users', {
                auth: { username: 'root', password: 'rootpassword' }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng', error);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://backend:8080/api/admin/users', newUser, {
                auth: { username: 'root', password: 'rootpassword' }
            });
            fetchUsers();
            setNewUser({ username: '', password: '', role: 'USER' });
        } catch (error) {
            alert('Tạo người dùng thất bại');
        }
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://backend:8080/api/admin/users/${updateRole.id}/role`, updateRole.role, {
                auth: { username: 'root', password: 'rootpassword' }
            });
            fetchUsers();
            setUpdateRole({ id: '', role: '' });
        } catch (error) {
            alert('Cập nhật vai trò thất bại');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Bảng điều khiển quản trị</h2>

            <div className="mb-8">
                <h3 className="text-xl mb-2">Tạo người dùng</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Tên người dùng"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="border p-2"
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="border p-2"
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="border p-2"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ROOT_ADMIN">ROOT_ADMIN</option>
                    </select>
                    <button onClick={handleCreateUser} className="bg-blue-500 text-white p-2">Tạo</button>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-xl mb-2">Cập nhật vai trò người dùng</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="ID người dùng"
                        value={updateRole.id}
                        onChange={(e) => setUpdateRole({ ...updateRole, id: e.target.value })}
                        className="border p-2"
                    />
                    <select
                        value={updateRole.role}
                        onChange={(e) => setUpdateRole({ ...updateRole, role: e.target.value })}
                        className="border p-2"
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ROOT_ADMIN">ROOT_ADMIN</option>
                    </select>
                    <button onClick={handleUpdateRole} className="bg-blue-500 text-white p-2">Cập nhật vai trò</button>
                </div>
            </div>

            <div>
                <h3 className="text-xl mb-2">Danh sách người dùng</h3>
                <ul>
                    {users.map(user => (
                        <li key={user.id} className="border p-2 mb-2">
                            {user.username} - {user.role}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboard;
