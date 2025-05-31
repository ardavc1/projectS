// src/components/Footer.tsx

import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#111827] text-gray-400 mt-16 pt-12 px-8 pb-6 text-sm">
      {/* Üst kısım: logo + sosyal medya */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        {/* Logo */}
        <a href="/" className="mb-6 md:mb-0">
          <img src="/longlogo.png" alt="Sosyalizer" className="w-44" />
        </a>

        {/* Sosyal medya ikonları */}
        <div className="flex space-x-4 text-xl text-white">
          <a href="#" className="hover:text-primary"><FaInstagram /></a>
          <a href="#" className="hover:text-primary"><FaTwitter /></a>
          <a href="#" className="hover:text-primary"><FaLinkedin /></a>
          <a href="#" className="hover:text-primary"><FaYoutube /></a>
          <a href="#" className="hover:text-primary"><FaFacebookF /></a>
        </div>
      </div>

      {/* Grid linkler */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
        {/* Kolon 1 */}
        <div className="space-y-2">
          <h4 className="text-white font-bold mb-2">Sosyalizer</h4>
          <a href="#" className="hover:text-primary block">Hakkımızda</a>
          <a href="#" className="hover:text-primary block">Etkinlikler</a>
          <a href="#" className="hover:text-primary block">Topluluklar</a>
          <a href="#" className="hover:text-primary block">Blog</a>
        </div>

        {/* Kolon 2 */}
        <div className="space-y-2">
          <h4 className="text-white font-bold mb-2">Topluluklar İçin</h4>
          <a href="#" className="hover:text-primary block">Organizatör Giriş</a>
          <a href="#" className="hover:text-primary block">Etkinlik Yayınla</a>
          <a href="#" className="hover:text-primary block">İş Birliği</a>
          <a href="#" className="hover:text-primary block">İletişim</a>
        </div>

        {/* Kolon 3 */}
        <div className="space-y-2">
          <h4 className="text-white font-bold mb-2">Popüler Etkinlikler</h4>
          <a href="#" className="hover:text-primary block">Teknoloji Etkinlikleri</a>
          <a href="#" className="hover:text-primary block">Kariyer Fuarları</a>
          <a href="#" className="hover:text-primary block">Workshoplar</a>
          <a href="#" className="hover:text-primary block">Festival ve Sosyal Etkinlikler</a>
        </div>

        {/* Kolon 4 */}
        <div className="space-y-2">
          <h4 className="text-white font-bold mb-2">Sözleşmeler</h4>
          <a href="#" className="hover:text-primary block">Kullanıcı Sözleşmesi</a>
          <a href="#" className="hover:text-primary block">KVKK ve Gizlilik</a>
          <a href="#" className="hover:text-primary block">Çerez Politikası</a>
          <a href="#" className="hover:text-primary block">Aydınlatma Metni</a>
        </div>
      </div>

      {/* Haberdar Ol alanı */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-8 mb-8">
        <h4 className="text-white font-bold mb-4 text-lg">Haberdar Ol!</h4>
        <p className="mb-4 text-gray-400">
          E-posta adresine iş ve staj ilanları, etkinlikler, kariyer tavsiyeleri gibi içerikler göndereceğiz.
        </p>
        <form className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="email"
            placeholder="E-posta adresiniz"
            className="px-4 py-3 rounded w-full sm:w-96 bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-primary outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-hover transition"
          >
            Kayıt Ol
          </button>
        </form>
      </div>

      {/* En alt copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Sosyalizer. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
