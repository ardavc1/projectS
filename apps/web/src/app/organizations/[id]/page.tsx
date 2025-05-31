"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrganizationDetailPage() {
  const params = useParams();
  const { id } = params;
  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:4000/organizations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setOrganization(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!organization) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Organizasyon yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-8 space-y-6">
      {/* BANNER + HEADER */}
      <div className="relative">
        {organization.bannerUrl ? (
          <img
            src={organization.bannerUrl}
            alt={organization.name}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
            Banner Yok
          </div>
        )}

        {/* Logo */}
        {organization.logoUrl && (
          <img
            src={organization.logoUrl}
            alt={`${organization.name} logo`}
            className="absolute left-8 bottom-0 translate-y-1/2 w-28 h-28 rounded-full border-4 border-white bg-white object-cover"
          />
        )}
      </div>

      {/* TITLE + META */}
      <div className="flex flex-wrap justify-between items-center px-8 mt-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-[#7E0FBA]">{organization.name}</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{organization.category || "Kategori Yok"}</span>
            <span>•</span>
            <span>10 takipçi</span> {/* Dummy → ileride dinamik */}
          </div>
        </div>

        <Button
          variant="outline"
          className="text-[#7E0FBA] border-[#7E0FBA] hover:bg-purple-50"
        >
          Takip Et {/* Dummy */}
        </Button>
      </div>

      {/* TABS */}
      <div className="border-b border-gray-200 px-8">
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-[#7E0FBA] border-b-2 border-[#7E0FBA] py-2">
            Anasayfa
          </a>
          <a href="#" className="text-gray-600 hover:text-[#7E0FBA] py-2">
            İlanlar
          </a>
          <a href="#" className="text-gray-600 hover:text-[#7E0FBA] py-2">
            Etkinlikler
          </a>
          <a href="#" className="text-gray-600 hover:text-[#7E0FBA] py-2">
            Yazılar
          </a>
        </nav>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row gap-6 px-8">
        {/* LEFT - MAIN */}
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Kısaca Biz</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {organization.description || "Henüz açıklama eklenmemiş."}
          </p>
        </div>

        {/* RIGHT - SIDEBAR */}
        <div className="w-full lg:w-80 space-y-4">
          <Card>
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Çalışan Sayısı</span>
                <span>11-50</span> {/* Dummy */}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Kuruluş Yılı</span>
                <span>1989</span> {/* Dummy */}
              </div>
            </CardContent>
          </Card>

          {/* Social Links (placeholder) */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <h3 className="text-sm font-bold text-gray-700">Takip Et</h3>
              <div className="flex space-x-3 text-[#7E0FBA] text-xl">
                <a href="#" aria-label="Instagram">
                  📸
                </a>
                <a href="#" aria-label="X">
                  🐦
                </a>
                <a href="#" aria-label="YouTube">
                  🎥
                </a>
                <a href="#" aria-label="Website">
                  🌐
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
