'use client';

import { useEffect, useState } from 'react';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  createdAt: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> — {event.location} — {new Date(event.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
