'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name?: string;
  password: string;
}

<h1 className="text-3xl font-bold text-blue-600">Users</h1>


export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Unexpected response:', data);
          setUsers([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (res.ok) {
        const newUser = await res.json();
        setUsers(prev => [...prev, newUser]);
        setEmail('');
        setName('');
        setPassword('');
        alert('User created!');
      } else {
        alert('Failed to create user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users</h1>

      <ul>
        {Array.isArray(users) && users.map(user => (
          <li key={user.id} style={{ marginBottom: '10px' }}>
            <strong>{user.name}</strong> - {user.email}

            {/* View Details button */}
            <a
              href={`/users/${user.id}`}
              style={{ marginLeft: '10px', textDecoration: 'underline', color: 'blue' }}
            >
              View Details
            </a>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '30px' }}>Create New User</h2>
      <form onSubmit={handleCreateUser}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}
