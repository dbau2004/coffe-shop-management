import React, { useState } from 'react';
import Login from './components/Login';
import TableManagement from './components/TableManagement';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    if (!token) {
        return <Login setToken={setToken} setRole={setRole} />;
    }

    if (role !== 'ROLE_ROOT_ADMIN') {
        return <div>Access denied</div>;
    }

    return <TableManagement token={token} />;
}

export default App;