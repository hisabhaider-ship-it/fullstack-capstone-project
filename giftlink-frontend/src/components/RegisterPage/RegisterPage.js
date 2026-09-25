import React, { useState } from 'react';

function RegisterPage() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setFormData({...formData, firstName: e.target.value})} placeholder="First Name" />
            <input type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Email" />
            <input type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterPage;
