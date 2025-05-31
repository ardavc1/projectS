"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // Şimdilik test için user ID = 1 çekeceğiz (ileride login olana göre dinamik yaparız)
  const userId = 1;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:4000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!user) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold">Profil yükleniyor...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-[#7E0FBA]">Kullanıcı Profili</h1>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-4 text-center">
          {/* Profil Fotoğrafı veya Baş Harf Avatar */}
          {user.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.name}
              className="w-32 h-32 rounded-full mx-auto object-cover"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-[#7E0FBA] text-white text-4xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "?"}
            </div>
          )}

          {/* Kullanıcı Bilgileri */}
          <h2 className="text-2xl font-semibold text-[#7E0FBA]">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>

          <Button className="bg-[#7E0FBA] hover:bg-[#9f3ad3] text-white mt-4">
            Profili Güncelle
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
