// apps/web/src/components/Navbar.tsx

export default function Navbar() {
    return (
      <nav className="h-16 px-8 flex items-center justify-between border-b border-gray-200 bg-gray-50">
        {/* LOGO */}
        <a href="/" className="flex items-center space-x-2">
          <img src="/longlogo.png" alt="Sosyalizer Logo" className="h-8 w-auto object-contain" />
        </a>
  
        {/* NAV LINKS */}
        <div className="flex space-x-6 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-[#7E0FBA]">Ana Sayfa</a>
          <a href="/users" className="hover:text-[#7E0FBA]">Kullanıcılar</a>
          <a href="/organizations" className="hover:text-[#7E0FBA]">Organizasyonlar</a>
          <a href="/events" className="hover:text-[#7E0FBA]">Etkinlikler</a>
          <a href="/profile" className="hover:text-[#7E0FBA]">Profil</a>
        </div>
      </nav>
    );
  }
  