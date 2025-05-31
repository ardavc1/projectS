'use client';

import { useEffect, useState } from 'react';

interface Organization {
  id: number;
  name: string;
  description?: string;
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ownerId, setOwnerId] = useState<number>(1); // şimdilik elle → test için 1

  useEffect(() => {
    fetch('http://localhost:4000/organizations')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setOrganizations(data);
        } else {
          console.error('Unexpected response:', data);
          setOrganizations([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          ownerId,
        }),
      });

      if (res.ok) {
        const newOrg = await res.json();
        setOrganizations(prev => [...prev, newOrg]);
        setName('');
        setDescription('');
        setOwnerId(1);
        alert('Organization created!');
      } else {
        alert('Failed to create organization');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Organizations</h1>

      <ul>
        {Array.isArray(organizations) && organizations.map(org => (
          <li key={org.id} style={{ marginBottom: '10px' }}>
            <strong>{org.name}</strong> - {org.description}

            {/* Join button */}
            <button
              style={{ marginLeft: '10px' }}
              onClick={async () => {
                const userId = 1; // Şimdilik elle → test için 1. User id kullanıyoruz
                try {
                  const res = await fetch(`http://localhost:4000/organizations/${org.id}/join`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                  });

                  if (res.ok) {
                    alert(`Joined organization: ${org.name}`);
                  } else {
                    alert('Failed to join organization');
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Join
            </button>
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '30px' }}>Create New Organization</h2>
      <form onSubmit={handleCreateOrganization}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Owner ID:</label>
          <input
            type="number"
            value={ownerId}
            onChange={e => setOwnerId(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Organization</button>
      </form>
    </div>
  );
}
