import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { products, setCurrentPage, setSelectedCategory } = useStore();
  const featuredProducts = products.filter(p => p.featured).slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Handpicked for You</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Featured Products</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Our most popular and highest-rated motorcycle accessories, chosen by our expert team.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <button
            onClick={() => { setSelectedCategory('All'); setCurrentPage('shop'); }}
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3 rounded-lg transition transform hover:scale-105"
          >
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
}
