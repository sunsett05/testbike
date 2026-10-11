import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CustomerInfo } from '../types';

export default function Checkout() {
  const { cart, getCartTotal, placeOrder, setCurrentPage } = useStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [form, setForm] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  const [errors, setErrors] = useState<Partial<CustomerInfo>>({});

  const subtotal = getCartTotal();
  const shipping = subtotal >= 99 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const validate = (): boolean => {
    const newErrors: Partial<CustomerInfo> = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim() || !form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Valid card number required';
    if (!form.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date required';
    if (!form.cardCvv.trim() || form.cardCvv.length < 3) newErrors.cardCvv = 'Valid CVV required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      items: cart,
      total,
      customer: form,
    };
    placeOrder(order);
    setOrderPlaced(true);
    setOrderId('ORD-' + Date.now().toString(36).toUpperCase());
  };

  const handleChange = (field: keyof CustomerInfo, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  if (orderPlaced) {
    return (
      <section className="py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-green-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-500 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-xl font-bold text-red-600">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              A confirmation email has been sent to <strong>{form.email}</strong>
            </p>
            <button
              onClick={() => setCurrentPage('shop')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    setCurrentPage('shop');
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={form.address}
                      onChange={e => handleChange('address', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={form.city}
                      onChange={e => handleChange('city', e.target.value)}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="Los Angeles"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={form.state}
                        onChange={e => handleChange('state', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.state ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="CA"
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                      <input
                        type="text"
                        value={form.zip}
                        onChange={e => handleChange('zip', e.target.value)}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.zip ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="90001"
                      />
                      {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  Payment Information
                </h3>
                <div className="flex gap-3 mb-4">
                  <div className="bg-gray-100 px-3 py-2 rounded text-sm font-bold text-gray-600">VISA</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-sm font-bold text-gray-600">MC</div>
                  <div className="bg-gray-100 px-3 py-2 rounded text-sm font-bold text-gray-600">AMEX</div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={form.cardNumber}
                      onChange={e => handleChange('cardNumber', formatCardNumber(e.target.value))}
                      maxLength={19}
                      className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cardNumber ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="4242 4242 4242 4242"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={form.cardExpiry}
                        onChange={e => handleChange('cardExpiry', e.target.value)}
                        maxLength={5}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cardExpiry ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="MM/YY"
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={form.cardCvv}
                        onChange={e => handleChange('cardCvv', e.target.value)}
                        maxLength={4}
                        className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.cardCvv ? 'border-red-400' : 'border-gray-200'}`}
                        placeholder="123"
                      />
                      {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Your payment information is encrypted and secure
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <img src={item.product.image} alt="" className="w-12 h-12 rounded object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600">${total.toFixed(2)}</span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg mt-6 transition transform hover:scale-[1.02] shadow-lg shadow-red-600/20"
              >
                🔒 Place Order - ${total.toFixed(2)}
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('cart')}
                className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 mt-2 transition text-sm"
              >
                ← Back to Cart
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
