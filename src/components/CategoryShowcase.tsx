import React from 'react';

export default function CategoryShowcase() {
  const categoryData = [
    {
      name: 'Helmets',
      icon: '🪖',
      description: 'Full-face, modular & open-face',
      color: 'from-blue-600 to-blue-800',
    },
    {
      name: 'Jackets',
      icon: '🧥',
      description: 'Leather, textile & mesh',
      color: 'from-purple-600 to-purple-800',
    },
    {
      name: 'Gloves',
      icon: '🧤',
      description: 'Racing, touring & casual',
      color: 'from-green-600 to-green-800',
    },
    {
      name: 'Boots',
      icon: '👢',
      description: 'Sport, touring & adventure',
      color: 'from-orange-600 to-orange-800',
    },
    {
      name: 'Exhaust',
      icon: '💨',
      description: 'Slip-ons & full systems',
      color: 'from-red-600 to-red-800',
    },
    {
      name: 'Protection',
      icon: '🛡️',
      description: 'Armor, guards & gear',
      color: 'from-gray-600 to-gray-800',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Browse by Category</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Shop by Category</h2>
          <p className="text-gray-500 text-lg">Find exactly what you need for your ride</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryData.map(cat => (
            <div
              key={cat.name}
              className={`bg-gradient-to-br ${cat.color} rounded-xl p-5 text-white text-center cursor-pointer hover:scale-105 transition-transform duration-300 shadow-lg`}
            >
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-sm">{cat.name}</h3>
              <p className="text-xs text-white/70 mt-1">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
