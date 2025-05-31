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
  const [imageUrl, setImageUrl] = useState(""); // Görsel URL state

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
          imageUrl, // Görsel URL de body'ye ekleniyor
        }),
      });

      if (res.ok) {
        const newEvent = await res.json();
        setEvents((prev) => [...prev, newEvent]);
        // Form temizle
        setTitle("");
        setDescription("");
        setLocation("");
        setDate("");
        setOrganizationId("");
        setImageUrl("");
        alert("Etkinlik oluşturuldu!");
      } else {
        alert("Etkinlik oluşturulamadı.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    const confirmed = confirm("Bu etkinliği silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/events/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        alert("Etkinlik silindi!");
      } else {
        alert("Etkinlik silinemedi.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#7E0FBA]">Etkinlikler</h1>

      {/* Etkinlik Listesi */}
      <Card>
        <CardContent className="p-4 space-y-2">
          {Array.isArray(events) && events.length > 0 ? (
            <ul className="space-y-2">
              {events.map((event) => (
                <li key={event.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {event.imageUrl && (
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <strong className="text-[#7E0FBA]">{event.title}</strong> - {event.location} -{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/events/${event.id}`}
                      className="text-blue-500 underline"
                    >
                      Detaylar
                    </a>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz etkinlik yok.</p>
          )}
        </CardContent>
      </Card>

      {/* Yeni Etkinlik Oluştur Formu */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Yeni Etkinlik Oluştur</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Konum</Label>
              <Input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="date">Tarih</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="organizationId">Organizasyon ID</Label>
              <Input
                id="organizationId"
                type="number"
                value={organizationId}
                onChange={(e) => setOrganizationId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="imageUrl">Görsel URL</Label>
              <Input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <Button type="submit" className="bg-[#7E0FBA] hover:bg-[#9f3ad3] text-white">
              Etkinlik Oluştur
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
