import React, { useState } from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        // Task 10 requirement: Content-Type and Authorization attributes in headers
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.authtoken) {
            localStorage.setItem('token', data.authtoken);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;
