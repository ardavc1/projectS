import EventCard from "@/components/EventCard";

export default function NewEvents() {
  const events = [
    {
      title: "Zero One Days 2025",
      date: "17 Ekim 2025, 10:00",
      location: "İÜC Avcılar Kampüsü",
      organizer: "İÜC Bilgisayar Kulübü",
      imageUrl: "/images/event1.jpg",
    },
    {
      title: "GameFest",
      date: "25 Kasım 2025, 13:00",
      location: "İstanbul Kongre Merkezi",
      organizer: "OTK Oyun Geliştirme Takımı",
      imageUrl: "/images/event2.jpg",
    },
    {
      title: "Cloud Engineering Panel",
      date: "12 Aralık 2025, 15:00",
      location: "Online",
      organizer: "Nexus Web Takımı",
      imageUrl: "/images/event3.jpg",
    },
  ];

  return (
    <section className="px-8 py-12 bg-bg-light rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-text-primary">
          Yeni Eklenen Etkinlikler
        </h2>
                <a
        href="#"
        className="text-primary hover:text-primary-hover font-medium"
        >
        Tüm Etkinlikleri Keşfet →
        </a>

      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </section>
  );
}
