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
      '01 أدرار': 1600,
      '02 الشلف': 800,
      '03 الأغواط': 1100,
      '04 أم البواقي': 950,
      '05 باتنة': 950,
      '06 بجاية': 850,
      '07 بسكرة': 1100,
      '08 بشار': 1400,
      '09 البليدة': 800,
      '10 البويرة': 850,
      '11 تمنراست': 1800,
      '12 تبسة': 1100,
      '13 تلمسان': 850,
      '14 تيارت': 850,
      '15 تيزي وزو': 850,
      '16 الجزائر': 750,
      '17 الجلفة': 1100,
      '18 جيجل': 950,
      '19 سطيف': 900,
      '20 سعيدة': 850,
      '21 سكيكدة': 950,
      '22 سيدي بلعباس': 850,
      '23 عنابة': 900,
      '24 قالمة': 900,
      '25 قسنطينة': 850,
      '26 المدية': 850,
      '27 مستغانم': 850,
      '28 المسيلة': 900,
      '29 معسكر': 850,
      '30 ورقلة': 1100,
      '31 وهران': 850,
      '32 البيض': 1200,
      '33 إليزي': 1200,
      '34 برج بوعريريج': 800,
      '35 بومرداس': 800,
      '36 الطارف': 900,
      '37 تندوف': 1600,
      '38 تيسمسيلت': 1000,
      '39 الوادي': 1100,
      '40 خنشلة': 900,
      '41 سوق أهراس': 900,
      '42 تيبازة': 800,
      '43 ميلة': 900,
      '44 عين الدفلى': 850,
      '45 النعامة': 1200,
      '46 عين تموشنت': 900,
      '47 غرداية': 1100,
      '48 غليزان': 900
    };

  const getDeliveryFee = (wilaya: string, mode: 'home' | 'desk') => {
    if (mode === 'desk') {
      // Desk pricing - specific prices for each wilaya
      const deskPrices: { [key: string]: number } = {
        '01 أدرار': 1000, '02 الشلف': 500, '03 الأغواط': 700, '04 أم البواقي': 500,
        '05 باتنة': 500, '06 بجاية': 500, '07 بسكرة': 700, '08 بشار': 900,
        '09 البليدة': 450, '10 البويرة': 450, '11 تمنراست': 1000, '12 تبسة': 600,
        '13 تلمسان': 400, '14 تيارت': 400, '15 تيزي وزو': 400, '16 الجزائر': 300,
        '17 الجلفة': 600, '18 جيجل': 400, '19 سطيف': 400, '20 سعيدة': 400,
        '21 سكيكدة': 400, '22 سيدي بلعباس': 400, '23 عنابة': 400, '24 قالمة': 400,
        '25 قسنطينة': 400, '26 المدية': 400, '27 مستغانم': 400, '28 المسيلة': 600,
        '29 معسكر': 400, '30 ورقلة': 700, '31 وهران': 400, '32 البيض': 700,
        '33 إليزي': 700, '34 برج بوعريريج': 400, '35 بومرداس': 400, '36 الطارف': 400,
        '37 تندوف': 1000, '38 تيسمسيلت': 600, '39 الوادي': 700, '40 خنشلة': 600,
        '41 سوق أهراس': 600, '42 تيبازة': 400, '43 ميلة': 600, '44 عين الدفلى': 400,
        '45 النعامة': 700, '46 عين تموشنت': 400, '47 غرداية': 700, '48 غليزان': 400
      };
      return deskPrices[wilaya] || 400;
    }
    
    // Home delivery pricing
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
      <h3 className="text-xl font-bold text-gray-900 mb-6">اطلب منتجك</h3>
      
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>سعر المنتج</span>
          <span>{selectedPrice.toLocaleString()} DZD</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>التوصيل ({deliveryMode === 'home' ? 'للمنزل' : 'من المكتب'})</span>
          <span className="font-semibold text-gray-900">{deliveryFee.toLocaleString()} DZD</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">المجموع للدفع</span>
          <span className="text-2xl font-bold text-black">{totalPrice.toLocaleString()} DZD</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الكامل <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="الاسم الكامل"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            رقم الهاتف <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="رقم الهاتف"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            العنوان <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="العنوان الكامل"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الولاية <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.wilaya}
            onChange={(e) => setFormData({...formData, wilaya: e.target.value})}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            required
          >
            <option value="">اختر ولايتك</option>
            <option value="01 أدرار">01 أدرار</option>
            <option value="02 الشلف">02 الشلف</option>
            <option value="03 الأغواط">03 الأغواط</option>
            <option value="04 أم البواقي">04 أم البواقي</option>
            <option value="05 باتنة">05 باتنة</option>
            <option value="06 بجاية">06 بجاية</option>
            <option value="07 بسكرة">07 بسكرة</option>
            <option value="08 بشار">08 بشار</option>
            <option value="09 البليدة">09 البليدة</option>
            <option value="10 البويرة">10 البويرة</option>
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
          </select>
        </div>

        {/* Delivery Mode Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            طريقة التوصيل <span className="text-red-500">*</span>
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
                    <p className="font-medium text-gray-900">التوصيل للمنزل</p>
                    <p className="text-sm text-gray-500">التوصيل لكل الولايات (السعر: {getDeliveryFee(formData.wilaya, 'home').toLocaleString()} دج)</p>
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
                    <p className="font-medium text-gray-900">استلام من المكتب (Stop Desk)</p>
                    <p className="text-sm text-gray-500">الاستلام من المكتب - {getDeliveryFee(formData.wilaya, 'desk').toLocaleString()} دج</p>
                  </div>
                </div>
                <span className="font-semibold text-gray-900">{getDeliveryFee(formData.wilaya, 'desk').toLocaleString()} DZD</span>
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
          {isSubmitting ? 'جاري الإرسال...' : 'اطلب الآن'}
        </button>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-green-600 text-2xl w-8 h-8 flex items-center justify-center"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال الطلب بنجاح!</h3>
            <p className="text-gray-600 mb-4">
              شكراً لطلبك. سنتواصل معك في أقرب وقت ممكن للتوصيل.
            </p>
            <p className="text-sm text-gray-500">
              رقم الطلب: #{Math.random().toString(36).substr(2, 9)}
            </p>
            <div className="bg-gray-100 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">الخطوات التالية:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• تأكيد طلبك عبر الهاتف</li>
                <li>• تجهيز طلبك (24-48 ساعة)</li>
                <li>• الشحن إلى ولايتك</li>
                <li>• التوصيل إلى عنوانك</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
