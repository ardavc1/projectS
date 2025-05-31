export default function Hero() {
    return (
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 bg-bg-light rounded-lg">
        {/* Left Side - Text */}
        <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Yeni İnsanlar, Yeni Etkinlikler, Yeni Fırsatlar
            </h1>
            <p className="text-lg text-text-secondary mb-4">
            Sosyalizer ile çevrendeki etkinlikleri keşfet, ilgi alanına göre topluluklara katıl, yeni arkadaşlar edin ve eğlenceli deneyimlerin bir parçası ol.
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg text-lg hover:bg-primary-hover transition">
            Etkinlikleri Keşfet
            </button>
        </div>
  
        {/* Right Side - Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-8 md:mb-0 md:ml-8">
          <img
            src="/images/hero1.jpg"
            alt="Event 1"
            className="rounded-lg object-cover w-40 h-40 md:w-48 md:h-48"
          />
          <img
            src="/images/hero2.jpg"
            alt="Event 2"
            className="rounded-lg object-cover w-40 h-40 md:w-48 md:h-48"
          />
          <img
            src="/images/hero3.jpg"
            alt="Event 3"
            className="rounded-lg object-cover w-40 h-40 md:w-48 md:h-48 col-span-2"
          />
        </div>
      </section>
    );
  }
  