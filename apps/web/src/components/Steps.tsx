// src/components/Steps.tsx

export default function Steps() {
    const steps = [
      {
        number: "1",
        title: "Etkileşime Geç",
        description:
          "Sosyalizer ile ilgi alanlarına uygun etkinlikleri keşfet ve topluluklara katılarak yeni insanlarla tanış.",
      },
      {
        number: "2",
        title: "Kendini Geliştir",
        description:
          "Katıldığın etkinliklerle bilgi ve becerilerini geliştir, farklı sektörlerden profesyonellerle etkileşime gir.",
      },
      {
        number: "3",
        title: "Kariyerine Başla",
        description:
          "Sosyal çevreni genişleterek staj ve iş fırsatlarına daha kolay eriş, kariyer yolculuğuna güçlü bir adım at.",
      },
    ];
  
    return (
      <section className="px-8 py-16 bg-bg-light rounded-lg">
        <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
          Nasıl Çalışır?
        </h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 text-center">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-primary text-white text-2xl font-bold rounded-full mb-6">
  {step.number}
</div>
              <h3 className="text-xl font-semibold text-text-primary mb-4">
                {step.title}
              </h3>
              <p className="text-text-secondary">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  