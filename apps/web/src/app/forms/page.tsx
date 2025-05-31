"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function FormsPage() {
  // User form state
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");

  // Organization form state
  const [orgName, setOrgName] = useState("");
  const [orgDescription, setOrgDescription] = useState("");
  const [orgOwnerId, setOrgOwnerId] = useState("");
  const [orgBannerUrl, setOrgBannerUrl] = useState("");
  const [orgLogoUrl, setOrgLogoUrl] = useState("");
  const [orgCategory, setOrgCategory] = useState("");

  // Event form state
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventOrganizationId, setEventOrganizationId] = useState("");
  const [eventImageUrl, setEventImageUrl] = useState("");

  // Submit Handlers
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
        password: userPassword,
        imageUrl: userImageUrl,
      }),
    });
    alert("User created!");
  };

  const handleCreateOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: orgName,
        description: orgDescription,
        ownerId: parseInt(orgOwnerId),
        bannerUrl: orgBannerUrl,
        logoUrl: orgLogoUrl,
        category: orgCategory,
      }),
    });
    alert("Organization created!");
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:4000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: eventTitle,
        description: eventDescription,
        location: eventLocation,
        date: eventDate,
        organizationId: parseInt(eventOrganizationId),
        imageUrl: eventImageUrl,
      }),
    });
    alert("Event created!");
  };

  return (
    <div className="max-w-screen-md mx-auto px-8 py-12 space-y-12">
      <h1 className="text-4xl font-extrabold text-[#7E0FBA] text-center mb-8">
        Test Forms
      </h1>

      {/* USER FORM */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#7E0FBA]">Kullanıcı Oluştur</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
            </div>
            <div>
              <Label>İsim</Label>
              <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div>
              <Label>Şifre</Label>
              <Input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
            </div>
            <div>
              <Label>Profil Fotoğrafı URL</Label>
              <Input value={userImageUrl} onChange={(e) => setUserImageUrl(e.target.value)} />
            </div>
            <Button type="submit" className="bg-[#7E0FBA] text-white w-full">Kullanıcı Oluştur</Button>
          </form>
        </CardContent>
      </Card>

      {/* ORGANIZATION FORM */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#7E0FBA]">Organizasyon Oluştur</h2>
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div>
              <Label>İsim</Label>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
            </div>
            <div>
              <Label>Açıklama</Label>
              <Input value={orgDescription} onChange={(e) => setOrgDescription(e.target.value)} />
            </div>
            <div>
              <Label>Owner ID</Label>
              <Input type="number" value={orgOwnerId} onChange={(e) => setOrgOwnerId(e.target.value)} required />
            </div>
            <div>
              <Label>Banner URL</Label>
              <Input value={orgBannerUrl} onChange={(e) => setOrgBannerUrl(e.target.value)} />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input value={orgLogoUrl} onChange={(e) => setOrgLogoUrl(e.target.value)} />
            </div>
            <div>
              <Label>Kategori</Label>
              <Input value={orgCategory} onChange={(e) => setOrgCategory(e.target.value)} />
            </div>
            <Button type="submit" className="bg-[#7E0FBA] text-white w-full">Organizasyon Oluştur</Button>
          </form>
        </CardContent>
      </Card>

      {/* EVENT FORM */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#7E0FBA]">Etkinlik Oluştur</h2>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div>
              <Label>Başlık</Label>
              <Input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
            </div>
            <div>
              <Label>Açıklama</Label>
              <Input value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} />
            </div>
            <div>
              <Label>Lokasyon</Label>
              <Input value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
            </div>
            <div>
              <Label>Tarih</Label>
              <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
            </div>
            <div>
              <Label>Organizasyon ID</Label>
              <Input type="number" value={eventOrganizationId} onChange={(e) => setEventOrganizationId(e.target.value)} required />
            </div>
            <div>
              <Label>Görsel URL</Label>
              <Input value={eventImageUrl} onChange={(e) => setEventImageUrl(e.target.value)} />
            </div>
            <Button type="submit" className="bg-[#7E0FBA] text-white w-full">Etkinlik Oluştur</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
