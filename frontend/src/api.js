const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.text();
};

export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role: 'ROLE_USER' }),
    });
    if (!response.ok) throw new Error('Registration failed');
};

export const fetchUsers = async (token) => {
    const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const fetchTables = async (token) => {
    const response = await fetch(`${API_URL}/api/admin/tables`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to fetch tables');
    return response.json();
};

export const createTable = async (token, tableData) => {
    const response = await fetch(`${API_URL}/api/admin/tables`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tableData),
    });
    if (!response.ok) throw new Error('Failed to create table');
};