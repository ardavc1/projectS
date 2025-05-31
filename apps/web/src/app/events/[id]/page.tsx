"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default function EventDetailPage() {
  const params = useParams();
  const { id } = params;
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!event) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Loading event...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Event Details</h1>
      <Card>
        <CardContent className="p-4 space-y-2">
          <p>
            <strong>ID:</strong> {event.id}
          </p>
          <p>
            <strong>Title:</strong> {event.title}
          </p>
          <p>
            <strong>Description:</strong> {event.description}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Organization ID:</strong> {event.organizationId}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
