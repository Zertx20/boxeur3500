export default function SocialProof() {
  const testimonials = [
    {
      name: 'Karim M.',
      business: 'Étudiant',
      text: 'Très confortables et le tissu anti-bactérien est vraiment efficace. Je les porte tous les jours!',
      rating: 5,
      image: '/Closeup_portrait_of_202601240329.jpeg',
      icon: 'ri-user-3-line',
    },
    {
      name: 'Sophie L.',
      business: 'Professionnelle',
      text: 'J\'adore le style premium des marques de luxe. Le confort est incroyable, je recommande vivement!',
      rating: 5,
      image: '/Portrait_of_a_202601240329.jpeg',
      icon: 'ri-briefcase-4-line',
    },
    {
      name: 'Yacine B.',
      business: 'Sportif',
      text: 'Parfait pour le sport! Le tissu respirant et la coupe sont excellents. Livraison rapide en plus.',
      rating: 5,
      image: '/Closeup_portrait_of_202601240336.jpeg',
      icon: 'ri-run-line',
    },
    {
      name: 'Nadia K.',
      business: 'Maman',
      text: 'Qualité exceptionnelle pour le prix. Mon mari les adore et ils résistent très bien aux lavages.',
      rating: 5,
      image: '/Portrait_of_a_202601240335.jpeg',
      icon: 'ri-heart-3-line',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌟 Ce Que Disent Nos Clients
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Découvrez les avis authentiques de nos clients satisfaits à travers toute l\'Algérie
          </p>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-black to-gray-800 rounded-2xl p-8 text-center shadow-xl">
            <div className="text-5xl font-bold text-white mb-2">10,000+</div>
            <div className="text-gray-300 font-medium">Clients satisfaits</div>
          </div>
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-8 text-center shadow-xl">
            <div className="text-5xl font-bold text-white mb-2">58</div>
            <div className="text-gray-300 font-medium">Wilayas livrées</div>
          </div>
          <div className="bg-gradient-to-br from-gray-700 to-gray-600 rounded-2xl p-8 text-center shadow-xl">
            <div className="text-5xl font-bold text-white mb-2">4.9⭐</div>
            <div className="text-gray-300 font-medium">Note moyenne</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer"
            >
              {/* Header with Image and Info */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <i className={`${testimonial.icon} w-4 h-4 flex items-center justify-center`}></i>
                    <span>{testimonial.business}</span>
                  </div>
                </div>
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-amber-400 text-lg w-5 h-5 flex items-center justify-center"></i>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-700 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Verified Badge */}
              <div className="mt-4 inline-flex items-center bg-black text-white px-3 py-1.5 rounded-full text-sm font-medium">
                <i className="ri-checkbox-circle-fill mr-1.5 w-4 h-4 flex items-center justify-center"></i>
                <span>Achat vérifié</span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4">
            <i className="ri-shield-check-line text-white text-2xl w-6 h-6 flex items-center justify-center"></i>
            <span className="text-white font-semibold text-lg">
              Tous les avis de clients ayant acheté et utilisé nos boxeurs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
