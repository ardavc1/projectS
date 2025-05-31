"use client";

import Hero from "@/components/hero";
import NewEvents from "@/components/NewEvents";
import ProfileSection from "@/components/ProfileSection";
import Steps from "@/components/Steps";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <NewEvents />
      <ProfileSection />
      <Steps />
    </div>
  );
}
