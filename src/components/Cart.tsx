import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, setCurrentPage } = useStore();

  const subtotal = getCartTotal();
  const shipping = subtotal >= 99 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0) {
    return (
      <section className="py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => setCurrentPage('shop')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.product.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center border border-gray-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.category}</p>
                  <p className="text-lg font-extrabold text-red-600 mt-1">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold transition"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    disabled={item.quantity >= item.product.stock}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center font-bold transition"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-1 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit sticky top-24">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-red-500 bg-red-50 p-2 rounded">
                  Add ${(99 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-extrabold text-red-600">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg mt-6 transition transform hover:scale-[1.02] shadow-lg shadow-red-600/20"
            >
              Proceed to Checkout →
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 mt-2 transition"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
