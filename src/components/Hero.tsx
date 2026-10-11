import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Hero() {
  const { setCurrentPage, setSelectedCategory } = useStore();

  const goToShop = () => {
    setSelectedCategory('All');
    setCurrentPage('shop');
  };

  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&h=800&fit=crop')",
        }}
      ></div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 py-24 md:py-36">
        <div className="max-w-2xl">
          <span className="inline-block bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4">
            🔥 NEW ARRIVALS 2024
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Premium Motorcycle{' '}
            <span className="text-red-500">Accessories</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Gear up with the finest motorcycle accessories. From racing helmets to
            performance exhausts — everything you need to ride with style and safety.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={goToShop}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-lg transition transform hover:scale-105 shadow-lg shadow-red-600/30"
            >
              Shop Now →
            </button>
            <button
              onClick={() => setCurrentPage('shop')}
              className="border-2 border-white/30 hover:border-white text-white font-bold px-8 py-4 rounded-lg transition hover:bg-white/10"
            >
              View Catalog
            </button>
          </div>
          <div className="flex items-center gap-8 mt-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free Shipping $99+
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Secure Payments
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              30-Day Returns
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
