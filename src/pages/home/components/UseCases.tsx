export default function UseCases() {
  const useCases = [
    {
      title: 'Usage Quotidien',
      description: 'Confort optimal pour tous les jours. Tissu respirant et anti-bactérien pour une hygiène parfaite.',
      icon: 'ri-home-heart-line',
      image: 'https://readdy.ai/api/search-image?query=Man%20wearing%20comfortable%20underwear%20at%20home%20relaxing%20daily%20life%20comfortable%20lifestyle%20modern%20interior%20clean%20fresh%20feeling%20premium%20underwear%20fashion%20realistic%20photography&width=700&height=500&seq=daily-usage&orientation=landscape',
      color: 'from-gray-700 to-black',
    },
    {
      title: 'Activités Sportives',
      description: 'Parfait pour le sport. Tissu technique qui évacue la transpiration et maintient la fraîcheur.',
      icon: 'ri-run-line',
      image: 'https://readdy.ai/api/search-image?query=Man%20doing%20sports%20exercise%20gym%20workout%20wearing%20sport%20underwear%20athletic%20performance%20breathable%20fabric%20modern%20fitness%20lifestyle%20realistic%20photography&width=700&height=500&seq=sport-usage&orientation=landscape',
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Confort Maison',
      description: 'Détente absolue à la maison. Tissu doux et élastique pour un confort sans égal.',
      icon: 'ri-home-smile-line',
      image: 'https://readdy.ai/api/search-image?query=Man%20relaxing%20at%20home%20comfortable%20lifestyle%20lounging%20premium%20underwear%20cozy%20home%20environment%20modern%20interior%20relaxation%20realistic%20photography&width=700&height=500&seq=home-usage&orientation=landscape',
      color: 'from-green-600 to-green-800',
    },
    {
      title: 'Vie Professionnelle',
      description: 'Style et confort pour le travail. Design élégant qui s\'adapte à votre tenue professionnelle.',
      icon: 'ri-briefcase-4-line',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20man%20office%20work%20wearing%20premium%20underwear%20business%20attire%20corporate%20style%20modern%20professional%20lifestyle%20realistic%20photography&width=700&height=500&seq=work-usage&orientation=landscape',
      color: 'from-purple-600 to-purple-800',
    },
    {
      title: 'Voyages et Déplacements',
      description: 'Idéal pour les voyages. Tissu léger et rapide à sécher, parfait pour valise.',
      icon: 'ri-plane-line',
      image: 'https://readdy.ai/api/search-image?query=Man%20traveling%20with%20luggage%20airport%20journey%20comfortable%20travel%20underwear%20lightweight%20quick%20dry%20modern%20travel%20lifestyle%20realistic%20photography&width=700&height=500&seq=travel-usage&orientation=landscape',
      color: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🎯 Pourquoi Choisir Nos Boxeurs ?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez comment nos boxeurs anti-bactériens s\'adaptent parfaitement à tous les moments de votre vie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="w-full h-full bg-gray-100">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${useCase.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                
                {/* Icon Badge */}
                <div className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${useCase.color} rounded-xl flex items-center justify-center shadow-lg`}>
                  <i className={`${useCase.icon} text-white text-xl w-6 h-6 flex items-center justify-center`}></i>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Action Hint */}
                <div className="mt-4 flex items-center gap-2 text-black font-medium group-hover:gap-3 transition-all">
                  <span className="text-sm">Découvrir</span>
                  <i className="ri-arrow-right-line w-4 h-4 flex items-center justify-center"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Prêt à Découvrir le Confort Premium ?
            </h3>
            <p className="text-gray-600 mb-6">
              Commandez votre pack de 3 boxeurs anti-bactériens et recevez-les en 48-72h!
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-black hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
            >
              <span>Commander maintenant</span>
              <i className="ri-arrow-up-line text-xl w-5 h-5 flex items-center justify-center"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
