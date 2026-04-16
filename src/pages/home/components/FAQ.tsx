import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Quelles tailles sont disponibles ?',
      answer: 'Nos boxeurs sont disponibles en 4 tailles : M, L, XL et 2XL. Consultez notre guide des tailles pour choisir la taille parfaite. Le tissu élastique s\'adapte parfaitement à votre morphologie.',
    },
    {
      question: 'Comment fonctionne la livraison en Algérie ?',
      answer: 'Nous livrons dans les 58 wilayas d\'Algérie en 48-72 heures. Vous pouvez choisir entre la livraison à domicile (600 DA) ou le retrait en Stop Desk (400 DA). La livraison est assurée et sécurisée.',
    },
    {
      question: 'Comment payer ma commande ?',
      answer: 'Le paiement se fait à la livraison! Vous payez uniquement lorsque vous recevez votre colis. Pas de paiement en ligne, pas de risques. Vous vérifiez votre commande avant de payer.',
    },
    {
      question: 'Quelles sont les marques disponibles ?',
      answer: 'Nous proposons les plus grandes marques de luxe : Louis Vuitton, Gucci, Hermès, Prada et Calvin Klein. Chaque marque offre un design unique avec la même qualité premium et la technologie anti-bactérienne.',
    },
    {
      question: 'Comment entretenir les boxeurs ?',
      answer: 'Nos boxeurs sont faciles d\'entretien! Lavez-les en machine à 30°C maximum avec un cycle délicat. Ne pas utiliser d\'eau de javel. Le tissu anti-bactérien reste efficace après des lavages répétés.',
    },
    {
      question: 'Qu\'est-ce que la technologie anti-bactérienne ?',
      answer: 'Notre technologie anti-bactérienne élimine 99% des bactéries et prévient les mauvaises odeurs. Le tissu reste frais et hygiénique toute la journée, même lors d\'activités intenses. Idéal pour la santé et le confort.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ❓ Questions Fréquentes
          </h2>
          <p className="text-lg text-gray-600">
            Tout ce que vous devez savoir sur nos boxeurs anti-bactériens premium
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span className="font-bold text-gray-900 text-lg pr-4 flex-1">
                  {faq.question}
                </span>
                <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-black flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}>
                  <i className="ri-arrow-down-s-line text-white text-xl w-5 h-5 flex items-center justify-center"></i>
                </div>
              </button>
              
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-white mb-3">
            Encore des questions ?
          </h3>
          <p className="text-gray-300 mb-6">
            Notre équipe est disponible 24/7 pour répondre à toutes vos questions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+213781517318"
              className="bg-white text-black font-bold px-6 py-3 rounded-lg hover:bg-gray-50 transition-all shadow-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
            >
              <i className="ri-phone-line text-xl w-5 h-5 flex items-center justify-center"></i>
              <span>Appeler</span>
            </a>
            <button
              onClick={() => {
                // Track Lead event when WhatsApp button is clicked in FAQ section
                if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                  window.fbq('track', 'Lead', {
                    content_name: 'WhatsApp Contact - FAQ',
                    content_category: 'Fashion'
                  });
                }
                
                const phoneNumber = '+213781517318';
                const message = encodeURIComponent('Bonjour, je suis intéressé(e) par les Boxeurs Anti-bactériens. Pouvez-vous me donner plus d\'informations ?');
                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
              }}
              className="bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition-all shadow-lg whitespace-nowrap cursor-pointer inline-flex items-center gap-2"
            >
              <i className="ri-whatsapp-line text-xl w-5 h-5 flex items-center justify-center"></i>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
