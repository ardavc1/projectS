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
  const [ownerId, setOwnerId] = useState<number>(1); // Şimdilik elle ownerId → 1 (test için)

  useEffect(() => {
    fetch('http://localhost:4000/organizations')
      .then(res => res.json())
      .then(data => setOrganizations(data))
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
        setOrganizations(prev => [...prev, newOrg]); // Yeni organization listeye ekle
        setName('');
        setDescription('');
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
        {organizations.map(org => (
          <li key={org.id}>
            <strong>{org.name}</strong> - {org.description}
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
