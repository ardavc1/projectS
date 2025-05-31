import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1D1F23] text-gray-400 mt-16 pt-12 px-8 pb-6 text-sm">
      {/* Üst: LOGO + İKONLAR + APP BUTTONS */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10">
        {/* Logo */}
        <a href="/" className="mb-6 md:mb-0">
          <img src="/longlogoW.png" alt="Sosyalizer" className="w-44" />
        </a>

        {/* Sağ taraf: İkonlar + App buttons */}
        <div className="flex items-center space-x-6">
          {/* Sosyal ikonlar */}
          <div className="flex space-x-4 text-xl text-white">
            <a href="#" className="hover:text-primary"><FaInstagram /></a>
            <a href="#" className="hover:text-primary"><FaTwitter /></a>
            <a href="#" className="hover:text-primary"><FaLinkedin /></a>
            <a href="#" className="hover:text-primary"><FaYoutube /></a>
            <a href="#" className="hover:text-primary"><FaFacebookF /></a>
          </div>

          {/* App Store buttons */}
          <div className="flex space-x-2">
            <a href="#">
              <img src="/appstore.png" alt="App Store’dan İndir" className="w-32" />
            </a>
            <a href="#">
              <img src="/googleplay.png" alt="Google Play’den İndir" className="w-32" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid: link kolonları */}
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

      {/* Haberdar Ol */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h4 className="text-white font-bold mb-2 text-lg">Haberdar Ol!</h4>
            <p className="text-gray-400">
              E-posta adresine iş ve staj ilanları, etkinlikler, kariyer tavsiyeleri gibi içerikler göndereceğiz.
            </p>
          </div>
          <form className="flex space-x-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="px-4 py-3 rounded bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-primary outline-none w-full md:w-80"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white rounded hover:bg-primary-hover transition"
            >
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>

      {/* En alt copyright */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        &copy; {new Date().getFullYear()} Sosyalizer. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
