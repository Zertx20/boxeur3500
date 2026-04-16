export default function Benefits() {
  const benefits = [
    {
      icon: 'ri-shield-check-line',
      title: 'Tissu Anti-bactérien',
      description: 'Protection hygiénique avancée qui élimine 99% des bactéries. Confort et sécurité toute la journée.',
    },
    {
      icon: 'ri-heart-line',
      title: 'Confort Ultra',
      description: 'Tissu doux et élastique qui s\'adapte parfaitement à votre morphologie. Sans coutures irritantes.',
    },
    {
      icon: 'ri-windy-line',
      title: 'Matériau Respirant',
      description: 'Technologie breathable qui évacue l\'humidité et maintient la fraîcheur. Idéal pour tous les jours.',
    },
    {
      icon: 'ri-vip-crown-line',
      title: 'Style Premium',
      description: 'Design élégant des plus grandes marques: Louis Vuitton, Gucci, Hermès, Prada, Calvin Klein.',
    },
    {
      icon: 'ri-eco-line',
      title: 'Qualité Durable',
      description: 'Matériaux de haute qualité qui résistent aux lavages répétés. Garantie de longévité.',
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Pack Économique',
      description: 'Pack de 3 boxeurs à prix avantageux. Économisez 30% par rapport à l\'achat unitaire.',
    },
  ];

  return (
    <section 
      className="py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(249, 250, 251, 0.7), rgba(255, 255, 255, 0.7)), url('/whatsapp-bg-new.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto pb-0">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🦠 Pourquoi Choisir nos Boxeurs Anti-bactériens ?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez le confort ultime avec notre collection premium de boxeurs anti-bactériens.
            Alliant hygiène, style et durabilité pour une expérience inégalée au quotidien.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center mb-6">
                <i className={`${benefit.icon} text-white text-2xl w-6 h-6 flex items-center justify-center`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
