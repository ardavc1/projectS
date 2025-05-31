"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const [userCount, setUserCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [organizationCount, setOrganizationCount] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Kullanıcı sayısı
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUserCount(data.length);
        }
      });

    // Etkinlik sayısı + etkinlik listesi
    fetch("http://localhost:4000/events")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEventCount(data.length);
          setEvents(data.slice(0, 3)); // Öne çıkan 3 etkinlik
        }
      });

    // Organizasyon sayısı
    fetch("http://localhost:4000/organizations")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrganizationCount(data.length);
        }
      });
  }, []);

  return (
    <div className="p-8 space-y-12">

      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-[#7E0FBA]">Sosyalizer'e Hoş Geldin 🎉</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Arkadaşlarınla yeni etkinliklere katıl, topluluklara dahil ol ve eğlenceli anlar biriktir!
        </p>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <Button className="bg-[#7E0FBA] hover:bg-[#9f3ad3] text-white px-6 py-3 text-lg">
            Keşfet
          </Button>
          <Button variant="outline" className="border-[#7E0FBA] text-[#7E0FBA] hover:bg-purple-50 px-6 py-3 text-lg">
            Hemen Katıl
          </Button>
        </div>
      </section>

      {/* Topluluk Bilgisi */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <Card>
          <CardContent className="p-6 space-y-2">
            <p className="text-gray-500">Toplam Kullanıcı</p>
            <p className="text-4xl font-bold text-[#7E0FBA]">{userCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <p className="text-gray-500">Toplam Etkinlik</p>
            <p className="text-4xl font-bold text-[#7E0FBA]">{eventCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 space-y-2">
            <p className="text-gray-500">Toplam Organizasyon</p>
            <p className="text-4xl font-bold text-[#7E0FBA]">{organizationCount}</p>
          </CardContent>
        </Card>
      </section>

      {/* Öne Çıkan Etkinlikler */}
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-[#7E0FBA]">Öne Çıkan Etkinlikler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold text-[#7E0FBA]">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {new Date(event.date).toLocaleDateString()} | {event.location}
                  </p>
                  <Button asChild className="mt-4 bg-[#7E0FBA] hover:bg-[#9f3ad3] text-white w-full">
                    <a href={`/events/${event.id}`}>Detayları Gör</a>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-600">Henüz öne çıkan etkinlik yok.</p>
          )}
        </div>
      </section>
    </div>
  );
}
