"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Unexpected response:", data);
          setUsers([]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });

      if (res.ok) {
        const newUser = await res.json();
        setUsers((prev) => [...prev, newUser]);
        setEmail("");
        setName("");
        setPassword("");
        alert("User created!");
      } else {
        alert("Failed to create user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-600">Users</h1>

      {/* User List */}
      <Card>
  <CardContent className="p-4 space-y-2">
    {Array.isArray(users) && users.length > 0 ? (
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> - {user.email}
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={`/users/${user.id}`}
                className="text-blue-500 underline"
              >
                View Details
              </a>
              <Button
                variant="destructive"
                onClick={async () => {
                  const confirmed = confirm(
                    `Are you sure you want to delete ${user.name}?`
                  );
                  if (confirmed) {
                    try {
                      const res = await fetch(
                        `http://localhost:4000/users/${user.id}`,
                        {
                          method: "DELETE",
                        }
                      );
                      if (res.ok) {
                        setUsers((prev) =>
                          prev.filter((u) => u.id !== user.id)
                        );
                        alert("User deleted!");
                      } else {
                        alert("Failed to delete user");
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No users found.</p>
    )}
  </CardContent>
</Card>


      {/* Create User Form */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">Create New User</h2>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Create User</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
