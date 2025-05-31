"use client";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200 px-8 h-16 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center space-x-8">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/longlogo.png" alt="Sosyalizer Logo" className="h-12 w-auto object-contain" />
        </a>

        {/* Main Nav Links */}
        <div className="h-16 flex items-center space-x-6 text-sm font-semibold text-black">
          <a href="/" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Ana Sayfa
          </a>
          <a href="/events" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Etkinlikler
          </a>
          <a href="/organizations" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Öğrenci Kulüpleri
          </a>
          <a href="/" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Burs
          </a>
          <a href="/" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Fırsatlar
          </a>
          <a href="/" className="transition-colors duration-300 hover:text-[#7E0FBA]">
            Blog
          </a>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center space-x-4">
        {/* Giriş Yap */}
        <a
          href="/login"
          className="flex items-center text-sm font-semibold text-black cursor-pointer hover:text-[#7E0FBA] transition-colors duration-300 select-none"
        >
          Giriş Yap
        </a>

        {/* Kayıt Ol */}
        <a
          href="/register"
          className="px-4 py-2 rounded text-white bg-[#7E0FBA] hover:bg-[#9f3ad3] text-sm font-semibold transition-colors duration-300"
        >
          Kayıt Ol
        </a>

      </div>
    </nav>
  );
}
