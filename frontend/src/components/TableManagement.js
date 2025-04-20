import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableManagement() {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ tableNumber: '', description: '', status: 'AVAILABLE' });

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const response = await axios.get('http://backend:8080/api/tables');
      setTables(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách bàn', error);
    }
  };

  const handleCreateTable = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://backend:8080/api/tables', newTable, {
        auth: { username: 'root', password: 'rootpassword' }
      });
      fetchTables();
      setNewTable({ tableNumber: '', description: '', status: 'AVAILABLE' });
    } catch (error) {
      alert('Tạo bàn thất bại');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Quản lý bàn</h2>
      
      <div className="mb-8">
        <h3 className="text-xl mb-2">Tạo bàn</h3>
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Số bàn"
            value={newTable.tableNumber}
            onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Mô tả"
            value={newTable.description}
            onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
            className="border p-2"
          />
          <select
            value={newTable.status}
            onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
            className="border p-2"
          >
            <option value="AVAILABLE">Chưa đặt</option>
            <option value="OCCUPIED">Đã đặt</option>
          </select>
          <button onClick={handleCreateTable} className="bg-blue-500 text-white p-2">Tạo</button>
        </div>
      </div>

      <div>
        <h3 className="text-xl mb-2">Danh sách bàn</h3>
        <ul>
          {tables.map(table => (
            <li key={table.id} className="border p-2 mb-2">
              Bàn {table.tableNumber} - {table.description} - {table.status === 'AVAILABLE' ? 'Chưa đặt' : 'Đã đặt'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TableManagement;
