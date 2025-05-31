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
        }),
      });

      if (res.ok) {
        const newOrg = await res.json();
        setOrganizations((prev) => [...prev, newOrg]);
        setName("");
        setDescription("");
        setOwnerId("");
        alert("Organization created!");
      } else {
        alert("Failed to create organization");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteOrganization = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this organization?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/organizations/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setOrganizations((prev) => prev.filter((o) => o.id !== id));
        alert("Organization deleted!");
      } else {
        alert("Failed to delete organization");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Organizations</h1>

      {/* Organization List */}
      <Card>
        <CardContent className="p-4 space-y-2">
          {Array.isArray(organizations) && organizations.length > 0 ? (
            <ul className="space-y-2">
              {organizations.map((org) => (
                <li key={org.id} className="flex justify-between items-center">
                  <div>
                    <strong>{org.name}</strong> - {org.description}
                  </div>
                  <div className="flex items-center space-x-2">
                    <a
                      href={`/organizations/${org.id}`}
                      className="text-blue-500 underline"
                    >
                      View Details
                    </a>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteOrganization(org.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No organizations found.</p>
          )}
        </CardContent>
      </Card>

      {/* Create Organization Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Create New Organization</h2>
          <form onSubmit={handleCreateOrganization} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="ownerId">Owner ID</Label>
              <Input
                id="ownerId"
                type="number"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create Organization</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
