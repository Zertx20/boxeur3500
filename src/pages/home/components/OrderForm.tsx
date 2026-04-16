import { useState } from 'react';

interface OrderFormProps {
  selectedPrice: number;
  selectedBrand: string;
  selectedSize: string;
}

export default function OrderForm({ selectedPrice, selectedBrand, selectedSize }: OrderFormProps) {
  const [deliveryMode, setDeliveryMode] = useState<'home' | 'desk'>('home');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    wilaya: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const getDeliveryFee = (wilaya: string, deliveryMode: string) => {
    if (deliveryMode === 'desk') return 400;
    
    // Wilaya-specific pricing for home delivery
    const wilayaPrices: { [key: string]: number } = {
      '01 أدرار': 900, '02 الشلف': 1000, '03 الأغواط': 1300, '04 أم البواقي': 1000,
      '05 باتنة': 700, '06 بسكرة': 1100, '07 بجاية': 850, '08 بشار': 1400,
      '09 البليدة': 950, '10 بسكرة': 1100, '11 تمنراست': 1000, '12 تبسة': 600,
      '13 تلمسان': 850, '14 تيارت': 900, '15 تيزي وزو': 850,
      '16 الجزائر': 750, '17 الجلفة': 1100, '18 جيجل': 950,
      '19 سطيف': 900, '20 سعيدة': 850, '21 إلى 20': 850,
      '21 سكيكدة': 950, '22 سيدي بلعباس': 850, '23 عنابة': 900,
      '24 قالمة': 900, '25 قسنطينة': 850, '26 المدية': 850,
      '27 مستغانم': 850, '28 المسيلة': 900, '29 معسكر': 850,
      '30 ورقلة': 1100, '31 وهران': 850, '32 البيض': 1200,
      '33 إليزي': 1000, '34 برج بوعريريج': 650, '35 بومرداس': 700,
      '36 الطارف': 400, '37 تندوف': 1000, '38 تيسمسيلت': 600,
      '39 الوادي': 700, '40 خنشلة': 600, '41 سوق أهراس': 900,
      '42 تيبازة': 700, '43 ميلة': 600, '44 عين الدفلى': 700,
      '45 النعامة': 700, '46 عين تموشنت': 900, '47 غرداية': 1100,
      '48 غليزان': 400, '49 غليزان': 900, '50 خنشلة': 600,
      '51 ورقلة': 700, '52 سطيف': 900, '53 تلمسان': 400,
      '54 تيارت': 900, '55 تيزي وزو': 400, '56 باتنة': 400,
      '57 بسكرة': 600, '58 تلمسان': 900, '59 عين الدفلى': 400,
      '60 سعيدة': 900, '61 سيدي بلعباس': 850, '62 عنابة': 900,
      '63 قالمة': 900, '64 قسنطينة': 850, '65 المدية': 850,
      '66 مستغانم': 850, '67 المسيلة': 600, '68 معسكر': 900,
      '69 خنشلة': 600, '70 ورقلة': 1100, '71 وهران': 850,
      '72 البيض': 1200, '73 إليزي': 1000, '74 برج بوعريريج': 700,
      '75 بومرداس': 700, '76 الطارف': 400, '77 تندوف': 1000,
      '78 تيسمسيلت': 600, '79 الوادي': 700, '80 خنشلة': 600,
      '81 سوق أهراس': 900, '82 تيبازة': 700, '83 ميلة': 600,
      '84 عين الدفلى': 700, '85 النعامة': 700, '86 عين تموشنت': 900,
      '87 غرداية': 1100, '88 غليزان': 400, '89 غليزان': 900,
      '90 خنشلة': 600, '91 ورقلة': 1100, '92 وهران': 850,
      '93 البيض': 1200, '94 إليزي': 1000, '95 برج بوعريريج': 700,
      '96 بومرداس': 700, '97 الطارف': 400, '98 تندوف': 1000,
      '99 تيسمسيلت': 600, '100 الوادي': 700, '101 خنشلة': 600,
      '102 ورقلة': 1100, '103 تيزي وزو': 400, '104 تيزي وزو': 400,
      '105 تيزي وزو': 850, '106 المدية': 850, '107 مستغانم': 850,
      '108 المسيلة': 900, '109 معسكر': 850, '110 خنشلة': 600,
      '111 ورقلة': 1100, '112 وهران': 850, '113 البيض': 1200,
      '114 إليزي': 1000, '115 برج بوعريريج': 700, '116 بومرداس': 700,
      '117 الطارف': 400, '118 تندوف': 1000, '119 تيسمسيلت': 600,
      '120 الوادي': 700, '121 خنشلة': 600, '122 ورقلة': 1100,
      '123 وهران': 850, '124 البيض': 1200, '125 إليزي': 1000,
      '126 برج بوعريريج': 700, '127 بومرداس': 700, '128 الطارف': 400,
      '129 تندوف': 1000, '130 تيسمسيلت': 600, '131 الوادي': 700,
      '132 خنشلة': 600, '133 ورقلة': 1100, '134 تيزي وزو': 400,
      '135 تيزي وزو': 400, '136 تيزي وزو': 850, '137 المدية': 850,
      '138 مستغانم': 850, '139 المسيلة': 900, '140 معسكر': 850,
      '141 خنشلة': 600, '142 ورقلة': 1100, '143 وهران': 850,
      '144 البيض': 1200, '145 إليزي': 1000, '146 برج بوعريريج': 700,
      '147 بومرداس': 700, '148 الطارف': 400, '149 تندوف': 1000,
      '150 تيسمسيلت': 600, '151 الوادي': 700, '152 خنشلة': 600,
      '153 ورقلة': 1100, '154 تيزي وزو': 400, '155 تيزي وزو': 400,
      '156 تيزي وزو': 850, '157 المدية': 850, '158 مستغانم': 850
    };
    
    return wilayaPrices[wilaya] || 600; // Default to 600 if wilaya not found
  };

  const deliveryFee = getDeliveryFee(formData.wilaya, deliveryMode);
  const totalPrice = selectedPrice + deliveryFee;

  const wilayas = [
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouira',
    'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Alger', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
    'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', 'M\'Sila', 'Mascara', 'Ouargla',
    'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
    'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
    'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam', 'Touggourt', 'Djanet', 'El M\'Ghair', 'El Menia'
  ];

  const sendOrderToGoogleSheet = async (orderData: any) => {
    try {
      console.log('Sending order data:', orderData);
      console.log('Sending to URL:', 'https://script.google.com/macros/s/AKfycbzucbFQZ7xjqRnEKFhdxQgYE90YhGZZLMXeDYqTHcfkNc-Vfdgcwd4jlkrsQJ7DiJz11w/exec');
      
      // Send data as URL-encoded string
      const urlEncodedData = Object.keys(orderData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(orderData[key])}`)
        .join('&');
      
      const response = await fetch('https://script.google.com/macros/s/AKfycbzucbFQZ7xjqRnEKFhdxQgYE90YhGZZLMXeDYqTHcfkNc-Vfdgcwd4jlkrsQJ7DiJz11w/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData
      });
      
      console.log('Order sent to Google Sheet successfully');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error sending order to Google Sheet:', error);
      alert('Erreur de connexion. Veuillez vérifier votre connexion internet.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const orderData = {
      ...formData,
      deliveryMode,
      totalPrice,
      brand: selectedBrand,
      size: selectedSize,
      productPrice: selectedPrice,
      deliveryFee,
      product: 'Boxeur Anti-bactérien Pack de 3'
    };

    // Track Lead event when form is successfully submitted
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: `Boxeur Anti-bactérien - ${selectedBrand}`,
        content_category: 'Fashion',
        value: totalPrice,
        currency: 'DZD',
        content_type: 'product'
      });
    }

    // Show success message first
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Send order to Google Sheets
    sendOrderToGoogleSheet(orderData);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        phone: '',
        address: '',
        wilaya: '',
      });
      setDeliveryMode('home');
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Commander votre pack</h3>
      
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Produit:</span>
          <span className="text-sm font-medium text-gray-900">Boxeur Anti-bactérien</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Marque:</span>
          <span className="text-sm font-medium text-gray-900">{selectedBrand}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Taille:</span>
          <span className="text-sm font-medium text-gray-900">{selectedSize}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Pack:</span>
          <span className="text-sm font-medium text-gray-900">3 boxeurs</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom &amp; Prénom <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            placeholder="Entrez votre nom complet"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
            placeholder="06 XX XX XX XX"
          />
        </div>

        {/* Wilaya */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wilaya <span className="text-red-500">*</span>
          </label>
          <select
            name="wilaya"
            required
            value={formData.wilaya}
            onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
          >
            <option value="">Sélectionnez votre wilaya</option>
            {wilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>{wilaya}</option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse complète <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent text-sm"
            placeholder="Entrez votre adresse complète"
            rows={3}
          />
        </div>

        {/* Delivery Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Mode de livraison <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            <div
              onClick={() => setDeliveryMode('home')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMode === 'home'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMode === 'home'
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-gray-300'
                  }`}>
                    {deliveryMode === 'home' && (
                      <i className="ri-check-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">À domicile</p>
                    <p className="text-sm text-gray-500">Livraison 58 wilayas</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{deliveryFee.toLocaleString()} DZD</span>
              </div>
            </div>

            <div
              onClick={() => setDeliveryMode('desk')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMode === 'desk'
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryMode === 'desk'
                      ? 'border-teal-500 bg-teal-500'
                      : 'border-gray-300'
                  }`}>
                    {deliveryMode === 'desk' && (
                      <i className="ri-check-line text-white text-sm w-4 h-4 flex items-center justify-center"></i>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bureau (Stop Desk)</p>
                    <p className="text-sm text-gray-500">Retrait au bureau - {getDeliveryFee(formData.wilaya, 'desk').toLocaleString()} DZD</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">400 DZD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Pack de 3 boxeurs ({selectedBrand})</span>
            <span>{selectedPrice.toLocaleString()} DZD</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Livraison ({deliveryMode === 'home' ? 'À domicile' : 'Stop Desk'})</span>
            <span>{deliveryFee.toLocaleString()} DZD</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">Total à payer</span>
            <span className="text-2xl font-bold text-black">{totalPrice.toLocaleString()} DZD</span>
          </div>
          <div className="mt-2 text-xs text-green-600 font-medium">
            <i className="ri-truck-line mr-1"></i>
            Paiement à la livraison
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl transform scale-100 animate-pulse">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-double-line text-green-600 text-4xl w-8 h-8 flex items-center justify-center"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée!</h3>
              <p className="text-lg text-gray-600 mb-4">Merci pour votre commande</p>
              <p className="text-sm text-gray-500">Nous vous livrerons dans les 48-72h</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || showSuccess}
          className={`w-full font-semibold py-4 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer ${
            isSubmitting || showSuccess
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>Traitement...</span>
              </>
            ) : showSuccess ? (
              <>
                <i className="ri-check-line text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>Commande envoyée!</span>
              </>
            ) : (
              <>
                <i className="ri-shopping-bag-line text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>Confirmer ma commande</span>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
