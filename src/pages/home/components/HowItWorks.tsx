export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Choisissez votre marque',
      description: 'Sélectionnez parmi les marques premium: Louis Vuitton, Gucci, Hermès, Prada, Calvin Klein.',
      icon: 'ri-vip-crown-line',
      color: 'from-gray-700 to-black',
    },
    {
      number: '2',
      title: 'Sélectionnez votre taille',
      description: 'Choisissez la taille parfaite: M, L, XL ou 2XL pour un confort optimal.',
      icon: 'ri-ruler-line',
      color: 'from-blue-600 to-blue-800',
    },
    {
      number: '3',
      title: 'Remplissez vos informations',
      description: 'Complétez le formulaire avec vos coordonnées et adresse de livraison.',
      icon: 'ri-edit-line',
      color: 'from-purple-600 to-purple-800',
    },
    {
      number: '4',
      title: 'Livraison rapide à domicile',
      description: 'Recevez votre pack de 3 boxeurs en 48-72h. Paiement à la livraison.',
      icon: 'ri-truck-line',
      color: 'from-green-600 to-green-800',
    },
  ];

  return (
    <section 
      className="pt-0 pb-20 px-4 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.7), rgba(249, 250, 251, 0.7)), url('/whatsapp-bg-new.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🛍️ Comment Commander ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            4 étapes simples pour recevoir vos boxeurs premium
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Icon Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
                  <div className={`w-full h-80 bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                    {/* Step Number Badge */}
                    <div className="absolute top-6 left-6 w-16 h-16 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl border border-white/30">
                      {step.number}
                    </div>
                    {/* Large Icon */}
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <i className={`${step.icon} text-white text-5xl w-12 h-12 flex items-center justify-center`}></i>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg border border-gray-100">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-black rounded-xl flex items-center justify-center mb-6">
                    <i className={`${step.icon} text-white text-2xl w-6 h-6 flex items-center justify-center`}></i>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Result Banner */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 md:p-12 text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              🚀 Commandez maintenant et recevez en 48-72h
            </h3>
            <p className="text-gray-300 text-lg mb-6">
              Livraison dans 58 wilayas, paiement à la livraison
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-white mb-1">48-72h</div>
                <div className="text-sm text-gray-300">Livraison rapide</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-white mb-1">3800 DA</div>
                <div className="text-sm text-gray-300">Pack de 3</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-white mb-1">58</div>
                <div className="text-sm text-gray-300">Wilayas couvertes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
