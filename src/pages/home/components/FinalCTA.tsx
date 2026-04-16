export default function FinalCTA() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    // Track Lead event when WhatsApp button is clicked in FinalCTA section
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp Contact - Final CTA',
        content_category: 'Fashion'
      });
    }
    
    const phoneNumber = '+213781517318';
    const message = encodeURIComponent('Bonjour, je suis intéressé(e) par les Boxeurs Anti-bactériens. Pouvez-vous me donner plus d\'informations ?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=Abstract%20modern%20technology%20pattern%20geometric%20shapes%20network%20connections%20digital%20mesh%20gradient%20dark%20background%20futuristic%20tech%20texture%20minimalist%20professional%20design%20clean%20lines&width=1920&height=1080&seq=cta-background&orientation=landscape')] opacity-10 bg-cover bg-center"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-5xl mx-auto text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-8">
          <i className="ri-alarm-warning-line text-red-400 text-xl w-5 h-5 flex items-center justify-center"></i>
          <span className="text-red-300 font-semibold">Stock Limité - Dernière Chance!</span>
        </div>

        {/* Main Headlines */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Commandez الآن 🦠<br />Stock en Voie d\'Épuisement!
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Les derniers packs de boxeurs anti-bactériens premium à prix réduit
        </p>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-timer-flash-line text-teal-400 text-2xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Livraison Express</h3>
            <p className="text-gray-400 text-sm">Recevez en 48-72h</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-shield-check-line text-emerald-400 text-2xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Qualité Premium</h3>
            <p className="text-gray-400 text-sm">Marques de luxe garanties</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <i className="ri-customer-service-2-line text-cyan-400 text-2xl w-6 h-6 flex items-center justify-center"></i>
            </div>
            <h3 className="font-bold text-white mb-2">Support 24/7</h3>
            <p className="text-gray-400 text-sm">Équipe toujours disponible</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button
            onClick={scrollToTop}
            className="group bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-full transition-all shadow-2xl whitespace-nowrap cursor-pointer inline-flex items-center gap-3 text-lg hover:scale-105"
          >
            <span>Commander Maintenant</span>
            <i className="ri-shopping-bag-2-line text-2xl w-6 h-6 flex items-center justify-center group-hover:translate-y-1 transition-transform"></i>
          </button>

          <button
            onClick={openWhatsApp}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-bold px-8 py-5 rounded-full transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-3 text-lg"
          >
            <i className="ri-whatsapp-line text-2xl w-6 h-6 flex items-center justify-center"></i>
            <span>WhatsApp</span>
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <i className="ri-truck-line text-white w-5 h-5 flex items-center justify-center"></i>
            <span>Livraison 58 wilayas</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-money-dollar-circle-line text-white w-5 h-5 flex items-center justify-center"></i>
            <span>Paiement à la livraison</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="ri-star-fill text-amber-400 w-5 h-5 flex items-center justify-center"></i>
            <span>10,000+ clients satisfaits</span>
          </div>
        </div>

        {/* Urgency Message */}
        <div className="mt-12 inline-block bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg px-6 py-3">
          <p className="text-red-300 font-medium flex items-center gap-2 justify-center">
            <i className="ri-alarm-warning-line w-5 h-5 flex items-center justify-center"></i>
            <span>⚠️ Moins de 50 packs restants - Commandez maintenant!</span>
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gray-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
