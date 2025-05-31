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
        <h1 className="text-3xl font-bold">Loading organization...</h1>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Organization Details</h1>
      <Card>
        <CardContent className="p-4 space-y-2">
          <p>
            <strong>ID:</strong> {organization.id}
          </p>
          <p>
            <strong>Name:</strong> {organization.name}
          </p>
          <p>
            <strong>Description:</strong> {organization.description}
          </p>
          <p>
            <strong>Owner:</strong> {organization.owner?.name} (ID: {organization.owner?.id})
          </p>

          <div className="mt-4">
            <strong>Members:</strong>
            {organization.members.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {organization.members.map((member: any) => (
                  <li key={member.id}>
                    {member.user?.name} (ID: {member.user?.id})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members.</p>
            )}
          </div>

          <div className="mt-4">
            <strong>Events:</strong>
            {organization.events.length > 0 ? (
              <ul className="list-disc list-inside ml-4">
                {organization.events.map((event: any) => (
                  <li key={event.id}>
                    {event.title} - {event.location} -{" "}
                    {new Date(event.date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No events.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
