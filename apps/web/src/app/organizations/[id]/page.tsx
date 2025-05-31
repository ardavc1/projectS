"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="p-8 space-y-6">
      <h1 className="text-4xl font-bold text-[#7E0FBA]">Organizasyon Detayı</h1>

      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-0">
          {/* Banner */}
          {organization.bannerUrl && (
            <img
              src={organization.bannerUrl}
              alt={organization.name}
              className="w-full h-64 object-cover rounded-t-md"
            />
          )}

          <div className="p-6 space-y-4">
            <h2 className="text-3xl font-bold text-[#7E0FBA]">{organization.name}</h2>
            <p className="text-gray-600">{organization.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Sahip (Owner) ID: {organization.ownerId}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
