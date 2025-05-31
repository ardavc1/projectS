"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    // Events çek
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 3)); // ilk 3 etkinlik
        } else {
          console.error("Unexpected response:", data);
          setEvents([]);
        }
      })
      .catch((err) => console.error(err));

    // Organizations çek
    fetch("http://localhost:4000/organizations")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrganizations(data);
        } else {
          console.error("Unexpected response:", data);
          setOrganizations([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  // Helper → organization name
  const getOrganizationName = (orgId: number) => {
    const org = organizations.find((o: any) => o.id === orgId);
    return org ? org.name : "Bilinmeyen Organizasyon";
  };

  return (
    <section className="px-8 py-12 bg-bg-light rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">
          Yeni Eklenen Etkinlikler
        </h2>
        <a
          href="/events"
          className="text-primary hover:text-primary-hover font-medium"
        >
          Tüm Etkinlikleri Keşfet →
        </a>
      </div>

      {Array.isArray(events) && events.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {events.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl overflow-hidden cursor-pointer bg-white"
              onClick={() => (window.location.href = `/events/${event.id}`)}
            >
              {/* Banner */}
              {event.imageUrl ? (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                  Görsel Yok
                </div>
              )}

              <CardContent className="p-4 space-y-2">
                {/* Tarih kutucuğu */}
                <div className="inline-block px-3 py-1 bg-primary text-white text-xs rounded mb-2">
                  {new Date(event.date).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>

                {/* Başlık */}
                <h2 className="text-lg font-bold text-primary truncate">
                  {event.title}
                </h2>

                {/* Lokasyon + saat */}
                <p className="text-gray-600 text-sm">
                  📍 {event.location} | 🕒{" "}
                  {new Date(event.date).toLocaleTimeString("tr-TR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>

                {/* Organizasyon adı */}
                <p className="text-xs text-gray-500">
                  Organizasyon:{" "}
                  <a
                    href={`/organizations/${event.organizationId}`}
                    className="text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevent card click
                  >
                    {getOrganizationName(event.organizationId)}
                  </a>
                </p>

                {/* Detayları Gör butonu */}
                <div className="pt-3">
                  <Button
                    variant="outline"
                    className="text-primary border-primary hover:bg-purple-50 w-full text-sm"
                  >
                    Detayları Gör
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Henüz etkinlik bulunamadı.</p>
      )}
    </section>
  );
}
