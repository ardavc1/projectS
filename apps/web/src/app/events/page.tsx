"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch events
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

    // Fetch organizations (for organization name lookup)
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
    <div className="space-y-8">
      {/* HERO */}
      <section className="bg-gray-50 py-12 px-8 text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-[#7E0FBA]">Etkinlikleri Keşfet</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          İlgi alanına göre etkinlikleri keşfet ve katıl!
        </p>
        {/* Search */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <input
            type="text"
            placeholder="Etkinlik Ara"
            className="border rounded-full px-5 py-3 w-80 focus:ring-2 focus:ring-[#7E0FBA]"
          />
          <select className="border rounded-full px-5 py-3 w-56 focus:ring-2 focus:ring-[#7E0FBA]">
            <option>Kategori</option>
          </select>
          <select className="border rounded-full px-5 py-3 w-56 focus:ring-2 focus:ring-[#7E0FBA]">
            <option>Lokasyon</option>
          </select>
        </div>
      </section>

      {/* EVENTS GRID */}
      <section className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <Card
              key={event.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl overflow-hidden cursor-pointer bg-white"
              onClick={() => window.location.href = `/events/${event.id}`}
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
                <div className="inline-block px-3 py-1 bg-[#7E0FBA] text-white text-xs rounded mb-2">
                  {new Date(event.date).toLocaleDateString("tr-TR", {
                    day: "2-digit",
                    month: "short",
                  })}
                </div>

                {/* Başlık */}
                <h2 className="text-lg font-bold text-[#7E0FBA] truncate">{event.title}</h2>

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
                    className="text-[#7E0FBA] hover:underline"
                    onClick={(e) => e.stopPropagation()} // Prevent card click
                  >
                    {getOrganizationName(event.organizationId)}
                  </a>
                </p>

                {/* Button */}
                <div className="pt-3">
                  <Button
                    variant="outline"
                    className="text-[#7E0FBA] border-[#7E0FBA] hover:bg-purple-50 w-full text-sm"
                  >
                    Detayları Gör
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="px-8 text-gray-600">Henüz etkinlik bulunamadı.</p>
        )}
      </section>
    </div>
  );
}
