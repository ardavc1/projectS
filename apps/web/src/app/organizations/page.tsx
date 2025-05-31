"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
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

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="bg-gray-50 py-12 px-8 text-center space-y-4">
        <h1 className="text-5xl font-extrabold text-[#7E0FBA]">Organizasyonları Keşfet</h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Üniversite topluluklarını, kulüpleri ve organizasyonları keşfet. Dilediğin organizasyona katıl!
        </p>
        {/* Search */}
        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <input
            type="text"
            placeholder="Organizasyon Ara"
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

      {/* ORGANIZATIONS GRID */}
      <section className="px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(organizations) && organizations.length > 0 ? (
          organizations.map((org) => (
            <Card
              key={org.id}
              className="hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] rounded-xl overflow-hidden cursor-pointer bg-white"
              onClick={() => window.location.href = `/organizations/${org.id}`}
            >
              {/* Banner */}
              <div className="relative">
                {org.bannerUrl ? (
                  <img
                    src={org.bannerUrl}
                    alt={org.name}
                    className="w-full h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-400">
                    Banner Yok
                  </div>
                )}

                {/* Logo */}
                {org.logoUrl && (
                  <img
                    src={org.logoUrl}
                    alt={`${org.name} logo`}
                    className="absolute -bottom-6 left-4 w-14 h-14 rounded-full border-4 border-white bg-white object-cover"
                  />
                )}
              </div>

              <CardContent className="pt-8 pb-4 px-4 space-y-2">
                <h2 className="text-lg font-bold text-[#7E0FBA] truncate">{org.name}</h2>
                <p className="text-gray-600 text-sm line-clamp-3">{org.description}</p>

                {/* Category */}
                {org.category && (
                  <div className="mt-2 text-xs text-gray-500">
                    #{org.category}
                  </div>
                )}

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
          <p className="px-8 text-gray-600">Henüz organizasyon bulunamadı.</p>
        )}
      </section>
    </div>
  );
}
