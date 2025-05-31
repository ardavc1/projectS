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
        <h1 className="text-3xl font-bold">Etkinlik yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-[#7E0FBA]">Etkinlik Detayı</h1>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-4">
          {/* Görsel */}
          {event.imageUrl && (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-64 object-cover rounded-md"
            />
          )}

          {/* Diğer bilgiler */}
          <h2 className="text-3xl font-bold text-[#7E0FBA]">{event.title}</h2>
          <p className="text-gray-600">{event.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString()} | {event.location}
          </p>
          <p className="text-sm text-gray-500 mt-2">Organizasyon ID: {event.organizationId}</p>
        </CardContent>
      </Card>
    </div>
  );
}
