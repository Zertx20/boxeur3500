import { useState, useEffect } from 'react';
import OrderForm from './OrderForm';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

export default function Hero() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedBrand, setSelectedBrand] = useState('Louis Vuitton');
  const [selectedImage, setSelectedImage] = useState('/IMG_8467.JPG.jpeg');
  const [showFloatingBar, setShowFloatingBar] = useState(true);

  const brands = ['Louis Vuitton', 'Gucci', 'Hermès', 'Prada', 'Calvin Klein'];
  const sizes = ['M', 'L', 'XL', '2XL'];

  const productImages = [
    '/IMG_8467.JPG.jpeg',
    '/IMG_8468.JPG.jpeg',
    '/IMG_8470.JPG.jpeg'
  ];
  const packPrice = 3500;
  const oldPrice = 4500;
  const discount = '-22%';


  useEffect(() => {
    const handleScroll = () => {
      const orderFormSection = document.getElementById('order-form-section');
      if (orderFormSection) {
        const rect = orderFormSection.getBoundingClientRect();
        // Hide bar when form is visible on screen
        setShowFloatingBar(rect.top > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextImage = () => {
    const currentIndex = productImages.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % productImages.length;
    setSelectedImage(productImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = productImages.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + productImages.length) % productImages.length;
    setSelectedImage(productImages[prevIndex]);
  };

  const scrollToOrderForm = () => {
    const orderFormElement = document.getElementById('order-form-section');
    if (orderFormElement) {
      orderFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openWhatsApp = () => {
    const phoneNumber = '+213781517318';
    const message = encodeURIComponent('Bonjour, je souhaite commander les Boxeurs Anti-bactériens Pack de 3. Quelles sont les disponibilités et délais de livraison ?');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section className="bg-white">
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="bg-white rounded-lg shadow-lg p-2 text-xs text-gray-700 font-medium">
          +213 781 51 73 18
        </div>
        <a
          href="https://wa.me/213781517318?text=Bonjour, je souhaite commander les Boxeurs Anti-bactériens Pack de 3. Quelles sont les disponibilités et délais de livraison ?"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if(typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', {content_name: 'Boxeur Anti-bactérien'}); }}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 transition-all transform hover:scale-110 flex items-center justify-center"
          aria-label="Contactez-nous sur WhatsApp"
        >
          <i className="ri-whatsapp-line text-2xl w-6 h-6 flex items-center justify-center"></i>
        </a>
      </div>
      {/* Mobile Layout - Image Carousel First */}
      <div className="lg:hidden">
        {/* Image Carousel */}
        <div className="relative w-full bg-gray-50">
          <div className="relative w-full aspect-square overflow-hidden">
            <img 
              src={selectedImage} 
              alt={`Boxeur Anti-bactérien ${selectedBrand} - Vue ${productImages.indexOf(selectedImage) + 1}`}
              className="w-full h-full object-contain"
            />
            
            {/* Carousel Navigation */}
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all z-10"
              aria-label="Image précédente"
            >
              <i className="ri-arrow-left-s-line text-gray-900 text-xl w-6 h-6 flex items-center justify-center"></i>
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer transition-all z-10"
              aria-label="Image suivante"
            >
              <i className="ri-arrow-right-s-line text-gray-900 text-xl w-6 h-6 flex items-center justify-center"></i>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {productImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(productImages[idx])}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    idx === productImages.indexOf(selectedImage) ? 'bg-teal-600 w-6' : 'bg-white/60'
                  }`}
                  aria-label={`Voir image ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Info - Mobile */}
        <div className="px-4 py-6 pb-32">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-block bg-black text-white px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
              Collection Premium
            </span>
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full">
              <i className="ri-star-fill text-amber-400 text-base w-4 h-4 flex items-center justify-center"></i>
              <span className="text-sm font-bold text-gray-900">4.9</span>
              <span className="text-xs text-gray-600">(248 avis)</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Boxeur Anti-bactérien 🦠
          </h1>

          {/* Brand Selector - Mobile */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Choisissez votre marque</h3>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setSelectedImage(productImages[0]);
                  }}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    selectedBrand === brand
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector - Mobile */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Taille</h3>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 mb-4 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">Pack de 3 boxeurs</span>
              <span className="inline-block bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">{discount}</span>
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-3xl font-bold text-gray-900">{packPrice.toLocaleString()} DZD</span>
              <span className="text-lg text-gray-400 line-through">{oldPrice.toLocaleString()} DZD</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">TOTAL À PAYER:</span>
              <span className="text-2xl font-bold text-black">{packPrice.toLocaleString()} DZD</span>
            </div>
            <div className="mt-3 inline-flex items-center bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
              <i className="ri-check-line mr-1.5 w-4 h-4 flex items-center justify-center"></i>
              Économisez {(oldPrice - packPrice).toLocaleString()} DZD ({discount})
            </div>
          </div>

          {/* Trust Badges - Mobile */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-shield-check-line text-teal-600 text-xl mb-1.5 w-5 h-5 flex items-center justify-center mx-auto"></i>
              <p className="text-xs text-gray-600 font-medium">Paiement sécurisé</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-truck-line text-black text-xl mb-1.5 w-5 h-5 flex items-center justify-center mx-auto"></i>
              <p className="text-xs text-gray-600 font-medium">Livraison 58 wilayas</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <i className="ri-customer-service-2-line text-teal-600 text-xl mb-1.5 w-5 h-5 flex items-center justify-center mx-auto"></i>
              <p className="text-xs text-gray-600 font-medium">Support 24/7</p>
            </div>
            <a
              href="https://wa.me/213781517318?text=Bonjour, je souhaite commander les Boxeurs Anti-bactériens Pack de 3. Quelles sont les disponibilités et délais de livraison ?"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { if(typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', {content_name: 'Boxeur Anti-bactérien'}); }}
              className="text-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
            >
              <i className="ri-whatsapp-line text-green-600 text-xl mb-1.5 w-5 h-5 flex items-center justify-center mx-auto"></i>
              <p className="text-xs text-gray-600 font-medium">WhatsApp</p>
            </a>
          </div>
        </div>

        {/* Floating Bottom Bar - Mobile Only (like a shopping app) */}
        {showFloatingBar && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 transition-all">
            <div className="flex items-center justify-between px-4 py-4 gap-4">
              {/* Left Side - Price Info */}
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-2xl font-bold text-gray-900">{packPrice.toLocaleString()}</span>
                  <span className="text-sm text-gray-900">DZD</span>
                </div>
                <p className="text-xs text-gray-500 font-medium">TOTAL À PAYER</p>
                <p className="text-xs text-green-600 font-semibold mt-0.5">
                  Économisez {(oldPrice - packPrice).toLocaleString()} DZD
                </p>
              </div>

              {/* Right Side - Commander Button */}
              <button
                onClick={scrollToOrderForm}
                className="bg-black hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full shadow-lg whitespace-nowrap cursor-pointer flex items-center gap-2 transition-all"
              >
                <span className="text-base">Commander maintenant</span>
                <i className="ri-arrow-down-line text-lg w-5 h-5 flex items-center justify-center"></i>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Layout - Original Side by Side */}
      <div className="hidden lg:block py-8 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Product Gallery - Desktop */}
          <div className="w-full">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
                <img 
                  src={selectedImage}
                  alt={`Boxeur Anti-bactérien ${selectedBrand} - Vue ${productImages.indexOf(selectedImage) + 1}`}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Brand Selector - Desktop */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Choisissez votre marque</h3>
                <div className="grid grid-cols-5 gap-2">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => {
                        setSelectedBrand(brand);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedBrand === brand
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector - Desktop */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Taille</h3>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-4 gap-3">
                {productImages.map((img, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedImage(img)}
                    className={`bg-gray-50 rounded-lg p-3 cursor-pointer transition-all ${
                      selectedImage === img ? 'ring-2 ring-black' : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                  >
                    <img 
                      src={img}
                      alt={`Vue ${i + 1} du boxeur ${selectedBrand}`}
                      className="w-full h-auto object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info - Desktop */}
          <div className="w-full">
            <div className="mb-4">
              <span className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                Collection Premium
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Boxeur Anti-bactérien 🦠<br/>
              <span className="text-xl md:text-2xl font-normal text-gray-600">Confort & Hygiène Premium</span>
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="ri-star-fill text-amber-400 text-lg w-5 h-5 flex items-center justify-center"></i>
                ))}
                <span className="text-gray-700 font-medium">4.9</span>
              </div>
              <span className="text-gray-500">(148 avis)</span>
            </div>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">{packPrice.toLocaleString()} DZD</span>
              <span className="text-xl text-gray-400 line-through">{oldPrice.toLocaleString()} DZD</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {discount} - Pack de 3
              </span>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Marque sélectionnée:</p>
              <p className="text-lg font-bold text-black">{selectedBrand}</p>
              <p className="text-sm text-gray-600 mt-2">Taille sélectionnée:</p>
              <p className="text-lg font-bold text-black">{selectedSize}</p>
            </div>

            {/* Product Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Caractéristiques Premium</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <i className="ri-shield-check-line text-black text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-700">Tissu anti-bactérien</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-heart-line text-black text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-700">Confort ultra</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-windy-line text-black text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-700">Tissu respirant</span>
                </div>
                <div className="flex items-center gap-3">
                  <i className="ri-vip-crown-line text-black text-xl w-5 h-5 flex items-center justify-center"></i>
                  <span className="text-sm text-gray-700">Style premium</span>
                </div>
              </div>
            </div>

            {/* Order Form - Desktop */}
            <OrderForm selectedPrice={packPrice} selectedBrand={selectedBrand} selectedSize={selectedSize} />

            {/* Trust Badges - Desktop */}
            <div className="mt-8 grid grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="ri-shield-check-line text-black text-2xl mb-2 w-6 h-6 flex items-center justify-center mx-auto"></i>
                <p className="text-xs text-gray-600 font-medium">Paiement à la livraison</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="ri-truck-line text-black text-2xl mb-2 w-6 h-6 flex items-center justify-center mx-auto"></i>
                <p className="text-xs text-gray-600 font-medium">Livraison 58 wilayas</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <i className="ri-customer-service-2-line text-black text-2xl mb-2 w-6 h-6 flex items-center justify-center mx-auto"></i>
                <p className="text-xs text-gray-600 font-medium">Support 24/7</p>
              </div>
              <a
                href="https://wa.me/213781517318?text=Bonjour, je souhaite commander les Boxeurs Anti-bactériens Pack de 3. Quelles sont les disponibilités et délais de livraison ?"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { if(typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', {content_name: 'Boxeur Anti-bactérien'}); }}
                className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-line text-green-600 text-2xl mb-2 w-6 h-6 flex items-center justify-center mx-auto"></i>
                <p className="text-xs text-gray-600 font-medium">WhatsApp</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Order Form Section - Mobile (scrolled to from button) */}
      <div id="order-form-section" className="lg:hidden px-4 pb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complétez votre commande</h2>
        
        <OrderForm selectedPrice={packPrice} selectedBrand={selectedBrand} selectedSize={selectedSize} />
      </div>
    </section>
  );
}
