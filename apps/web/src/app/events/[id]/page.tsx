// src/app/events/[id]/page.tsx

import { notFound } from "next/navigation";

type EventDetailProps = {
  params: { id: string };
};

// Fetch event by ID
async function getEvent(id: string) {
  const res = await fetch(`http://localhost:4000/events/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

// Fetch organization by ID
async function getOrganization(orgId: number) {
  const res = await fetch(`http://localhost:4000/organizations/${orgId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function EventDetailPage({ params }: EventDetailProps) {
  const event = await getEvent(params.id);

  if (!event) {
    return notFound();
  }

  const organization = await getOrganization(event.organizationId);

  return (
    <section className="px-8 py-16 max-w-6xl mx-auto space-y-8">
      {/* Üst Başlık */}
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-text-primary">
          {event.title}
        </h1>
        <p className="text-gray-600 text-lg">
          {new Date(event.date).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "long",
          })}{" "}
          {new Date(event.date).toLocaleDateString("tr-TR", {
            weekday: "short",
          })}
        </p>
      </div>

      {/* Ana İçerik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sol taraf: Görsel + Açıklama */}
        <div className="md:col-span-2 space-y-6">
          {/* Görsel */}
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-80 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full h-80 bg-gray-200 flex items-center justify-center text-gray-400 rounded-lg">
              Görsel Yok
            </div>
          )}

          {/* Açıklama */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              Etkinlik Detayları
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed whitespace-pre-line">
              {event.description || "Açıklama bulunamadı."}
            </p>
          </div>
        </div>

        {/* Sağ taraf: Organizasyon + Lokasyon + Detaylar */}
        <div className="space-y-6">
          {/* Harita (şimdilik placeholder) */}
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 rounded-lg">
            Harita Yeri (Google Maps Embed buraya gelebilir)
          </div>

          {/* Organizasyon Bilgisi */}
          <div className="border p-4 rounded-lg space-y-2 bg-white shadow">
            <h3 className="text-lg font-bold text-text-primary mb-2">
              ORGANİZASYON
            </h3>
            <div className="flex items-center space-x-2">
              {organization?.logoUrl && (
                <img
                  src={organization.logoUrl}
                  alt={organization.name}
                  className="w-10 h-10 object-cover rounded-full"
                />
              )}
              <a
                href={`/organizations/${organization?.id}`}
                className="text-primary hover:text-primary-hover font-medium"
              >
                {organization?.name || "Bilinmeyen Organizasyon"}
              </a>
            </div>
          </div>

          {/* Lokasyon Bilgisi */}
          <div className="border p-4 rounded-lg space-y-2 bg-white shadow">
            <h3 className="text-lg font-bold text-text-primary mb-2">
              LOKASYON
            </h3>
            <p className="text-text-secondary">{event.location}</p>
            {/* İstersen event.address, event.city gibi alanları da ekleyebiliriz */}
          </div>

          {/* Detaylar */}
          <div className="border p-4 rounded-lg space-y-2 bg-white shadow">
            <h3 className="text-lg font-bold text-text-primary mb-2">Detaylar</h3>
            <p className="text-sm text-gray-600">
              📅 Başlangıç:{" "}
              {new Date(event.date).toLocaleDateString("tr-TR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}{" "}
              {new Date(event.date).toLocaleDateString("tr-TR", {
                weekday: "short",
              })}{" "}
              {new Date(event.date).toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Etkinliğe Katıl Butonu */}
          <a
            href="#"
            className="block text-center px-6 py-3 bg-primary text-white rounded-lg text-lg hover:bg-primary-hover transition"
          >
            Etkinliğe Katıl
          </a>
        </div>
      </div>
    </section>
  );
}
