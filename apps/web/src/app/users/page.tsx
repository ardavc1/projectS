'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email} - {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
