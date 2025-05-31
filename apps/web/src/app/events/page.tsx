"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [organizationId, setOrganizationId] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Unexpected response:", data);
          setEvents([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          location,
          date,
          organizationId,
        }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents((prev) => [...prev, newEvent]);
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setOrganizationId("");
        alert("Event created!");
      } else {
        alert("Failed to create event");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        alert("Event deleted!");
      } else {
        alert("Failed to delete event");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Events</h1>

      {/* Event List */}
      <Card>
  <CardContent className="p-4 space-y-2">
    {Array.isArray(events) && events.length > 0 ? (
      <ul className="space-y-2">
        {events.map((event) => (
          <li key={event.id} className="flex justify-between items-center">
            <div>
              <strong>{event.title}</strong> - {event.location} -{" "}
              {new Date(event.date).toLocaleDateString()}
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={`/events/${event.id}`}
                className="text-blue-500 underline"
              >
                View Details
              </a>
              <Button
                variant="destructive"
                onClick={() => handleDeleteEvent(event.id)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No events found.</p>
    )}
  </CardContent>
</Card>

      {/* Create Event Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Create New Event</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="organizationId">Organization ID</Label>
              <Input
                id="organizationId"
                type="number"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create Event</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
