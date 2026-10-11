import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export default function Header() {
  const { setCurrentPage, getCartCount, searchQuery, setSearchQuery, isAdmin, setIsAdmin, setSelectedCategory } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage('shop');
  };

  const navigate = (page: 'home' | 'shop' | 'cart' | 'admin') => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (page === 'shop') {
      setSelectedCategory('All');
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('home')}>
            <div className="text-red-500 text-2xl mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Moto<span className="text-red-500">Gear</span> Pro
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate('home')} className="hover:text-red-400 transition font-medium">
              Home
            </button>
            <button onClick={() => navigate('shop')} className="hover:text-red-400 transition font-medium">
              Shop
            </button>
            <button onClick={() => navigate('cart')} className="hover:text-red-400 transition font-medium relative">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setIsAdmin(!isAdmin); navigate('admin'); }}
              className={`hover:text-red-400 transition font-medium ${isAdmin ? 'text-red-400' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800 text-white px-4 py-2 rounded-l-lg border border-gray-700 focus:outline-none focus:border-red-500 w-48"
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-r-lg transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700 mt-2 pt-4">
            <div className="flex flex-col space-y-3">
              <button onClick={() => navigate('home')} className="text-left hover:text-red-400 transition">Home</button>
              <button onClick={() => navigate('shop')} className="text-left hover:text-red-400 transition">Shop</button>
              <button onClick={() => navigate('cart')} className="text-left hover:text-red-400 transition">
                Cart {cartCount > 0 && `(${cartCount})`}
              </button>
              <button onClick={() => { setIsAdmin(!isAdmin); navigate('admin'); }} className="text-left hover:text-red-400 transition">
                Admin Panel
              </button>
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-l border border-gray-700 focus:outline-none flex-1"
                />
                <button type="submit" className="bg-red-600 px-3 py-2 rounded-r">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
