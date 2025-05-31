'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [organizationId, setOrganizationId] = useState<number>(1); // yeni eklenen state

  useEffect(() => {
    fetch('http://localhost:4000/events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error('Unexpected response:', data);
          setEvents([]);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          location,
          date,
          organizationId, // yeni eklenen field
        }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents(prev => [...prev, newEvent]);
        setTitle('');
        setDescription('');
        setLocation('');
        setDate('');
        setOrganizationId(1); // default geri al
        alert('Event created!');
      } else {
        alert('Failed to create event');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Events</h1>

      <ul>
        {Array.isArray(events) && events.map(event => (
          <li key={event.id}>
            <strong>{event.title}</strong> - {event.description} - {event.location} - {new Date(event.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: '30px' }}>Create New Event</h2>
      <form onSubmit={handleCreateEvent}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Organization ID:</label>
          <input
            type="number"
            value={organizationId}
            onChange={e => setOrganizationId(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
