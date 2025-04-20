import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUserRole } from '../api';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', role: 'USER' });
    const [updateRole, setUpdateRole] = useState({ id: '', role: '' });
    const [loading, setLoading] = useState(false); // Trạng thái tải

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await fetchUsers();
            setUsers(data);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            alert(error.message || 'Không thể tải danh sách người dùng.');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        if (!newUser.username || !newUser.password) {
            alert('Vui lòng nhập đầy đủ thông tin người dùng.');
            return;
        }

        setLoading(true);
        try {
            await createUser(newUser);
            alert('Tạo người dùng thành công!');
            setNewUser({ username: '', password: '', role: 'USER' });
            loadUsers();
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
            alert(error.message || 'Không thể tạo người dùng.');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        if (!updateRole.id || !updateRole.role) {
            alert('Vui lòng nhập ID người dùng và vai trò.');
            return;
        }

        setLoading(true);
        try {
            await updateUserRole(updateRole.id, updateRole.role);
            alert('Cập nhật vai trò thành công!');
            setUpdateRole({ id: '', role: '' });
            loadUsers();
        } catch (error) {
            console.error('Lỗi khi cập nhật vai trò:', error);
            alert(error.message || 'Không thể cập nhật vai trò.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl mb-4">Bảng điều khiển quản trị</h2>

            {/* Tạo người dùng */}
            <div className="mb-8">
                <h3 className="text-xl mb-2">Tạo người dùng</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Tên người dùng"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        className="border p-2"
                        disabled={loading}
                    />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        className="border p-2"
                        disabled={loading}
                    />
                    <select
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                        className="border p-2"
                        disabled={loading}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ROOT_ADMIN">ROOT_ADMIN</option>
                    </select>
                    <button
                        onClick={handleCreateUser}
                        className={`p-2 ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                        disabled={loading}
                    >
                        {loading ? 'Đang tạo...' : 'Tạo'}
                    </button>
                </div>
            </div>

            {/* Cập nhật vai trò */}
            <div className="mb-8">
                <h3 className="text-xl mb-2">Cập nhật vai trò người dùng</h3>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="ID người dùng"
                        value={updateRole.id}
                        onChange={(e) => setUpdateRole({ ...updateRole, id: e.target.value })}
                        className="border p-2"
                        disabled={loading}
                    />
                    <select
                        value={updateRole.role}
                        onChange={(e) => setUpdateRole({ ...updateRole, role: e.target.value })}
                        className="border p-2"
                        disabled={loading}
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="ROOT_ADMIN">ROOT_ADMIN</option>
                    </select>
                    <button
                        onClick={handleUpdateRole}
                        className={`p-2 ${loading ? 'bg-gray-400' : 'bg-blue-500 text-white'}`}
                        disabled={loading}
                    >
                        {loading ? 'Đang cập nhật...' : 'Cập nhật vai trò'}
                    </button>
                </div>
            </div>

            {/* Danh sách người dùng */}
            <div>
                <h3 className="text-xl mb-2">Danh sách người dùng</h3>
                {loading ? (
                    <p>Đang tải danh sách người dùng...</p>
                ) : users.length === 0 ? (
                    <p>Chưa có người dùng nào.</p>
                ) : (
                    <ul>
                        {users.map((user) => (
                            <li key={user.id} className="border p-2 mb-2">
                                <strong>{user.username}</strong> - {user.role}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;