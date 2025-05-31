"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [bannerUrl, setBannerUrl] = useState(""); // Banner URL state

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

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/organizations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          ownerId: parseInt(ownerId),
          bannerUrl, // Banner URL gönderiyoruz!
        }),
      });

      if (res.ok) {
        const newOrg = await res.json();
        setOrganizations((prev) => [...prev, newOrg]);
        // Form temizle
        setName("");
        setDescription("");
        setOwnerId("");
        setBannerUrl("");
        alert("Organizasyon oluşturuldu!");
      } else {
        alert("Organizasyon oluşturulamadı.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrganization = async (id: number) => {
    const confirmed = confirm("Bu organizasyonu silmek istediğinize emin misiniz?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/organizations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrganizations((prev) => prev.filter((o) => o.id !== id));
        alert("Organizasyon silindi!");
      } else {
        alert("Organizasyon silinemedi.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-[#7E0FBA]">Organizasyonlar</h1>

      {/* Organizasyon Listesi */}
      <Card>
        <CardContent className="p-4 space-y-2">
          {Array.isArray(organizations) && organizations.length > 0 ? (
            <ul className="space-y-2">
              {organizations.map((org) => (
                <li key={org.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {org.bannerUrl && (
                      <img
                        src={org.bannerUrl}
                        alt={org.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <strong className="text-[#7E0FBA]">{org.name}</strong> - {org.description}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/organizations/${org.id}`}
                      className="text-blue-500 underline"
                    >
                      Detaylar
                    </a>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteOrganization(org.id)}
                    >
                      Sil
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Henüz organizasyon yok.</p>
          )}
        </CardContent>
      </Card>

      {/* Yeni Organizasyon Oluştur Formu */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Yeni Organizasyon Oluştur</h2>
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div>
              <Label htmlFor="name">İsim</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <Label htmlFor="ownerId">Sahip (Owner) Kullanıcı ID</Label>
              <Input
                id="ownerId"
                type="number"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="bannerUrl">Banner URL</Label>
              <Input
                id="bannerUrl"
                type="text"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                placeholder="https://example.com/banner.jpg"
              />
            </div>
            <Button type="submit" className="bg-[#7E0FBA] hover:bg-[#9f3ad3] text-white">
              Organizasyon Oluştur
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
