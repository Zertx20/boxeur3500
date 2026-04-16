import { useState } from 'react';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  wilaya: string;
}

export default function OrderForm({ selectedBrand, selectedSize, selectedPrice }: {
  selectedBrand: string;
  selectedSize: string;
  selectedPrice: number;
}) {
  const [deliveryMode, setDeliveryMode] = useState<'home' | 'desk'>('home');
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    wilaya: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  const getDeliveryFee = (wilaya: string, mode: 'home' | 'desk') => {
    if (mode === 'desk') return 400;
    
    return wilayaPrices[wilaya] || 600; // Default to 600 if wilaya not found
  };

  const deliveryFee = getDeliveryFee(formData.wilaya, deliveryMode);
  const totalPrice = selectedPrice + deliveryFee;

  // Debug logging
  console.log('=== DELIVERY PRICING DEBUG ===');
  console.log('Selected wilaya:', formData.wilaya);
  console.log('Delivery mode:', deliveryMode);
  console.log('Wilaya price lookup:', wilayaPrices[formData.wilaya]);
  console.log('Calculated delivery fee:', deliveryFee);
  console.log('Product price:', selectedPrice);
  console.log('Total price:', totalPrice);
  console.log('=== END DEBUG ===');

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
    <form onSubmit={handleSubmit} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm" id="order-form-section">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Commander votre pack</h3>
      
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Pack de 3 boxeurs ({selectedBrand})</span>
          <span>{selectedPrice.toLocaleString()} DZD</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Livraison ({deliveryMode === 'home' ? 'À domicile' : 'Stop Desk'})</span>
          <span className="font-semibold text-gray-900">{deliveryFee.toLocaleString()} DZD</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total à payer</span>
          <span className="text-2xl font-bold text-black">{totalPrice.toLocaleString()} DZD</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nom complet <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Votre nom complet"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Téléphone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Votre numéro de téléphone"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adresse <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Votre adresse complète"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wilaya <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.wilaya}
            onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          >
            <option value="">Sélectionnez votre wilaya</option>
            <option value="01 أدرار">01 أدرار</option>
            <option value="02 الشلف">02 الشلف</option>
            <option value="03 الأغواط">03 الأغواط</option>
            <option value="04 أم البواقي">04 أم البواقي</option>
            <option value="05 باتنة">05 باتنة</option>
            <option value="06 بسكرة">06 بسكرة</option>
            <option value="07 بجاية">07 بجاية</option>
            <option value="08 بشار">08 بشار</option>
            <option value="09 البليدة">09 البليدة</option>
            <option value="10 بسكرة">10 بسكرة</option>
            <option value="11 تمنراست">11 تمنراست</option>
            <option value="12 تبسة">12 تبسة</option>
            <option value="13 تلمسان">13 تلمسان</option>
            <option value="14 تيارت">14 تيارت</option>
            <option value="15 تيزي وزو">15 تيزي وزو</option>
            <option value="16 الجزائر">16 الجزائر</option>
            <option value="17 الجلفة">17 الجلفة</option>
            <option value="18 جيجل">18 جيجل</option>
            <option value="19 سطيف">19 سطيف</option>
            <option value="20 سعيدة">20 سعيدة</option>
            <option value="21 إلى 20">21 إلى 20</option>
            <option value="21 سكيكدة">21 سكيكدة</option>
            <option value="22 سيدي بلعباس">22 سيدي بلعباس</option>
            <option value="23 عنابة">23 عنابة</option>
            <option value="24 قالمة">24 قالمة</option>
            <option value="25 قسنطينة">25 قسنطينة</option>
            <option value="26 المدية">26 المدية</option>
            <option value="27 مستغانم">27 مستغانم</option>
            <option value="28 المسيلة">28 المسيلة</option>
            <option value="29 معسكر">29 معسكر</option>
            <option value="30 ورقلة">30 ورقلة</option>
            <option value="31 وهران">31 وهران</option>
            <option value="32 البيض">32 البيض</option>
            <option value="33 إليزي">33 إليزي</option>
            <option value="34 برج بوعريريج">34 برج بوعريريج</option>
            <option value="35 بومرداس">35 بومرداس</option>
            <option value="36 الطارف">36 الطارف</option>
            <option value="37 تندوف">37 تندوف</option>
            <option value="38 تيسمسيلت">38 تيسمسيلت</option>
            <option value="39 الوادي">39 الوادي</option>
            <option value="40 خنشلة">40 خنشلة</option>
            <option value="41 سوق أهراس">41 سوق أهراس</option>
            <option value="42 تيبازة">42 تيبازة</option>
            <option value="43 ميلة">43 ميلة</option>
            <option value="44 عين الدفلى">44 عين الدفلى</option>
            <option value="45 النعامة">45 النعامة</option>
            <option value="46 عين تموشنت">46 عين تموشنت</option>
            <option value="47 غرداية">47 غرداية</option>
            <option value="48 غليزان">48 غليزان</option>
            <option value="49 غليزان">49 غليزان</option>
            <option value="50 خنشلة">50 خنشلة</option>
            <option value="51 ورقلة">51 ورقلة</option>
            <option value="52 سطيف">52 سطيف</option>
            <option value="53 تلمسان">53 تلمسان</option>
            <option value="54 تيارت">54 تيارت</option>
            <option value="55 تيزي وزو">55 تيزي وزو</option>
            <option value="56 باتنة">56 باتنة</option>
            <option value="57 بسكرة">57 بسكرة</option>
            <option value="58 تلمسان">58 تلمسان</option>
            <option value="59 عين الدفلى">59 عين الدفلى</option>
            <option value="60 سعيدة">60 سعيدة</option>
            <option value="61 سيدي بلعباس">61 سيدي بلعباس</option>
            <option value="62 عنابة">62 عنابة</option>
            <option value="63 قالمة">63 قالمة</option>
            <option value="64 قسنطينة">64 قسنطينة</option>
            <option value="65 المدية">65 المدية</option>
            <option value="66 مستغانم">66 مستغانم</option>
            <option value="67 المسيلة">67 المسيلة</option>
            <option value="68 معسكر">68 معسكر</option>
            <option value="69 خنشلة">69 خنشلة</option>
            <option value="70 ورقلة">70 ورقلة</option>
            <option value="71 وهران">71 وهران</option>
            <option value="72 البيض">72 البيض</option>
            <option value="73 إليزي">73 إليزي</option>
            <option value="74 برج بوعريريج">74 برج بوعريريج</option>
            <option value="75 بومرداس">75 بومرداس</option>
            <option value="76 الطارف">76 الطارف</option>
            <option value="77 تندوف">77 تندوف</option>
            <option value="78 تيسمسيلت">78 تيسمسيلت</option>
            <option value="79 الوادي">79 الوادي</option>
            <option value="80 خنشلة">80 خنشلة</option>
            <option value="81 سوق أهراس">81 سوق أهراس</option>
            <option value="82 تيبازة">82 تيبازة</option>
            <option value="83 ميلة">83 ميلة</option>
            <option value="84 عين الدفلى">84 عين الدفلى</option>
            <option value="85 النعامة">85 النعامة</option>
            <option value="86 عين تموشنت">86 عين تموشنت</option>
            <option value="87 غرداية">87 غرداية</option>
            <option value="88 غليزان">88 غليزان</option>
            <option value="89 غليزان">89 غليزان</option>
            <option value="90 خنشلة">90 خنشلة</option>
            <option value="91 ورقلة">91 ورقلة</option>
            <option value="92 وهران">92 وهران</option>
            <option value="93 البيض">93 البيض</option>
            <option value="94 إليزي">94 إليزي</option>
            <option value="95 برج بوعريريج">95 برج بوعريريج</option>
            <option value="96 بومرداس">96 بومرداس</option>
            <option value="97 الطارف">97 الطارف</option>
            <option value="98 تندوف">98 تندوف</option>
            <option value="99 تيسمسيلت">99 تيسمسيلت</option>
            <option value="100 الوادي">100 الوادي</option>
            <option value="101 خنشلة">101 خنشلة</option>
            <option value="102 ورقلة">102 ورقلة</option>
            <option value="103 تيزي وزو">103 تيزي وزو</option>
            <option value="104 تيزي وزو">104 تيزي وزو</option>
            <option value="105 تيزي وزو">105 تيزي وزو</option>
            <option value="106 المدية">106 المدية</option>
            <option value="107 مستغانم">107 مستغانم</option>
            <option value="108 المسيلة">108 المسيلة</option>
            <option value="109 معسكر">109 معسكر</option>
          </select>
        </div>

        {/* Delivery Mode Selection */}
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
                    <p className="text-sm text-gray-500">Livraison 58 wilayas (DEBUG: wilaya={formData.wilaya}, fee={getDeliveryFee(formData.wilaya, 'home').toLocaleString()} DZD)</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{getDeliveryFee(formData.wilaya, 'home').toLocaleString()} DZD</span>
              </div>
            </div>

            <div
              onClick={() => setDeliveryMode('desk')}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                deliveryMode === 'desk'
                  ? 'border-teal-500 bg-teal-500'
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
                    <p className="text-sm text-gray-500">Retrait au bureau - {getDeliveryFee(formData.wilaya, 'desk').toLocaleString()} DZD (DEBUG: wilaya={formData.wilaya})</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">400 DZD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Commander maintenant'}
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Commande envoyée avec succès!</h3>
            <p className="text-gray-600 mb-4">
              Merci pour votre commande. Nous vous contacterons dans les plus brefs délais pour la livraison.
            </p>
            <p className="text-sm text-gray-500">
              Numéro de commande: #{Math.random().toString(36).substr(2, 9)}
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Prochaines étapes:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Confirmation de votre commande par téléphone</li>
                <li>• Préparation de votre pack (24-48h)</li>
                <li>• Expédition vers votre wilaya</li>
                <li>• Livraison à votre adresse</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
