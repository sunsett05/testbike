import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Marcus Chen',
      role: 'Track Day Enthusiast',
      text: 'Best helmet selection I\'ve found online. The AGV Pista GP RR I bought fits perfectly and the shipping was incredibly fast. Will definitely be back!',
      rating: 5,
      avatar: '👨‍🦱',
    },
    {
      name: 'Sarah Williams',
      role: 'Adventure Rider',
      text: 'The Givi side cases transformed my touring setup. Great quality aluminum construction and the mounting system is rock solid. Excellent customer service too.',
      rating: 5,
      avatar: '👩',
    },
    {
      name: 'Jake Morrison',
      role: 'Sport Bike Rider',
      text: 'Ordered the Akrapovič exhaust and Dainese gloves together. Both arrived in perfect condition. The exhaust sounds incredible and the gloves are top-notch quality.',
      rating: 5,
      avatar: '🧔',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">What Riders Say</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 mb-3">Customer Reviews</h2>
          <p className="text-gray-500 text-lg">Trusted by thousands of riders worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.avatar}</span>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-extrabold text-red-600">10K+</div>
            <p className="text-sm text-gray-500 mt-1">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-extrabold text-red-600">500+</div>
            <p className="text-sm text-gray-500 mt-1">Products Available</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-extrabold text-red-600">4.8★</div>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
          <div className="text-center p-6 bg-gray-50 rounded-xl">
            <div className="text-3xl font-extrabold text-red-600">24/7</div>
            <p className="text-sm text-gray-500 mt-1">Customer Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
