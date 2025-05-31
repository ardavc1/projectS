// src/components/ProfileSection.tsx

export default function ProfileSection() {
    return (
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-bg-light rounded-lg">
        {/* Left - Image */}
        <div className="mb-8 md:mb-0 md:mr-8 flex-shrink-0">
          <img
            src="/images/profile-section.jpg"
            alt="Profilini Oluştur"
            className="rounded-lg object-cover w-96 h-64"
          />
        </div>
  
        {/* Right - Text */}
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold text-text-primary mb-6">
            Profilini Oluştur
          </h2>
          <p className="text-lg text-text-secondary mb-4">
            Sosyalizer’da kendi profilini oluşturarak ilgi alanlarına göre etkinlikleri keşfedebilir, topluluklara katılabilir ve yeni arkadaşlar edinebilirsin. 
            Katıldığın etkinlikler profilinde yer alır ve gelecekteki organizasyonlar için sana öneriler sunulur.
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-lg text-lg hover:bg-primary-hover transition">
            Profilini Oluştur
          </button>
        </div>
      </section>
    );
  }
  