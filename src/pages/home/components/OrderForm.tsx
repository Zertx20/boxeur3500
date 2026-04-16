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

  const deliveryFee = deliveryMode === 'home' ? 600 : 400;
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
      console.log('Sending to URL:', 'https://script.google.com/macros/s/AKfycbzkaudJBLApsTvRs0Yj6DasqIZVwpdEp8x37rAV1_A23fB2wmoXLKmWiQvqvtTGMfurWA/exec');
      
      // Create a hidden form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://script.google.com/macros/s/AKfycbzkaudJBLApsTvRs0Yj6DasqIZVwpdEp8x37rAV1_A23fB2wmoXLKmWiQvqvtTGMfurWA/exec';
      
      // Add form data as hidden inputs
      Object.keys(orderData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = orderData[key];
        form.appendChild(input);
      });
      
      // Submit the form
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      console.log('Order submitted via form to Google Sheet');
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
                <span className="font-semibold text-gray-900">600 DZD</span>
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
                    <p className="text-sm text-gray-500">Retrait au bureau</p>
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
