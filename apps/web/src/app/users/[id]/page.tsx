'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Organization {
  id: number;
  name: string;
  description?: string;
}

interface UserDetail {
  id: number;
  name?: string;
  email: string;
  memberOrganizations: {
    organization: Organization;
  }[];
}

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetail | null>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('User detail:', data);
        setUser(data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Detail</h1>
      <p>
        <strong>Name:</strong> {user.name} <br />
        <strong>Email:</strong> {user.email}
      </p>

      <h2>Member of Organizations:</h2>
      <ul>
        {user.memberOrganizations.length > 0 ? (
          user.memberOrganizations.map(membership => (
            <li key={membership.organization.id}>
              <strong>{membership.organization.name}</strong> - {membership.organization.description}
            </li>
          ))
        ) : (
          <p>This user is not a member of any organization.</p>
        )}
      </ul>
    </div>
  );
}
