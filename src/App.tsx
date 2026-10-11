import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryShowcase from './components/CategoryShowcase';
import FeaturedProducts from './components/FeaturedProducts';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Admin from './components/Admin';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

function AppContent() {
  const { currentPage } = useStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedProducts />
            <Testimonials />
          </>
        );
      case 'shop':
        return <ProductGrid />;
      case 'product-detail':
        return <ProductDetail />;
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'admin':
        return <Admin />;
      default:
        return (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedProducts />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
