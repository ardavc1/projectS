"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfilePage() {
  // Şimdilik statik kullanıcı bilgisi (ileride giriş yapan kullanıcıdan çekebiliriz)
  const user = {
    name: "Mehmet Yılmaz",
    email: "mehmet.yilmaz@example.com",
    avatarUrl: "https://via.placeholder.com/150", // geçici profil fotoğrafı
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-[#7E0FBA]">Kullanıcı Profili</h1>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 space-y-4 text-center">
          <img
            src={user.avatarUrl}
            alt="Profil Fotoğrafı"
            className="w-32 h-32 rounded-full mx-auto"
          />
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
