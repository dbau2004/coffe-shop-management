import React, { useState, useEffect } from 'react';
import { fetchTables, createTable } from '../api';

function TableManagement({ token }) {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tableNumber: '', description: '', status: 'AVAILABLE' });

    useEffect(() => {
        const loadTables = async () => {
            try {
                const data = await fetchTables(token);
                setTables(data);
            } catch (error) {
                alert(error.message);
            }
        };
        loadTables();
    }, [token]);

    const handleCreateTable = async () => {
        try {
            await createTable(token, newTable);
            setNewTable({ tableNumber: '', description: '', status: 'AVAILABLE' });
            const data = await fetchTables(token);
            setTables(data);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Create Table</h2>
            <input
                type="number"
                placeholder="Table Number"
                value={newTable.tableNumber}
                onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
            />
            <input
                type="text"
                placeholder="Description"
                value={newTable.description}
                onChange={(e) => setNewTable({ ...newTable, description: e.target.value })}
            />
            <select
                value={newTable.status}
                onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
            >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
            </select>
            <button onClick={handleCreateTable}>Create Table</button>
            <h2>Tables</h2>
            <ul>
                {tables.map((table) => (
                    <li key={table.id}>
                        {table.tableNumber} - {table.description} - {table.status}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TableManagement;