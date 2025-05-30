'use client';

import { useEffect, useState } from 'react';

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/organizations')
      .then(res => res.json())
      .then(data => setOrganizations(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Organizations</h1>
      <ul>
        {organizations.map(org => (
          <li key={org.id}>
            <strong>{org.name}</strong> - {org.description}
          </li>
        ))}
      </ul>
    </div>
  );
}