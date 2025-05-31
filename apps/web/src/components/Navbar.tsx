"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-purple-200 px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-[#7E0FBA]">
        Sosyalizer
      </div>

      {/* Menu */}
      <div className="flex space-x-6 text-gray-700 font-medium">
        <Link
          href="/"
          className="hover:text-[#9f3ad3] transition-colors duration-200"
        >
          Ana Sayfa
        </Link>
        <Link
          href="/users"
          className="hover:text-[#9f3ad3] transition-colors duration-200"
        >
          Kullanıcılar
        </Link>
        <Link
          href="/organizations"
          className="hover:text-[#9f3ad3] transition-colors duration-200"
        >
          Organizasyonlar
        </Link>
        <Link
          href="/events"
          className="hover:text-[#9f3ad3] transition-colors duration-200"
        >
          Etkinlikler
        </Link>
        <Link
          href="/profile"
          className="hover:text-[#9f3ad3] transition-colors duration-200"
        >
          Profil
        </Link>
      </div>
    </nav>
  );
}
