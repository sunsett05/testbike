import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { categories } from '../data/products';

export default function Admin() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateStock, isAdmin, setIsAdmin } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add'>('products');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  // New Product Form
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Helmets',
    image: '',
    stock: '',
    rating: '4.5',
    reviews: '0',
    featured: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isAdmin) {
    return (
      <section className="py-20 bg-gray-50 min-h-[60vh]">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Admin Access Required</h2>
            <p className="text-gray-500 mb-6">Please enable admin mode to access the dashboard.</p>
            <button
              onClick={() => setIsAdmin(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition"
            >
              Enable Admin Mode
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!newProduct.name.trim()) errors.name = 'Name is required';
    if (!newProduct.description.trim()) errors.description = 'Description is required';
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) errors.price = 'Valid price is required';
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) errors.stock = 'Valid stock quantity is required';
    if (!newProduct.image.trim()) errors.image = 'Image URL is required';

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    addProduct({
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      stock: parseInt(newProduct.stock),
      rating: parseFloat(newProduct.rating),
      reviews: parseInt(newProduct.reviews),
      featured: newProduct.featured,
    });

    setNewProduct({
      name: '',
      description: '',
      price: '',
      category: 'Helmets',
      image: '',
      stock: '',
      rating: '4.5',
      reviews: '0',
      featured: false,
    });
    setFormErrors({});
    setActiveTab('products');
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    setShowDeleteConfirm(null);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter(p => p.stock <= 5);

  return (
    <section className="py-8 bg-gray-50 min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h2>
            <p className="text-gray-500 mt-1">Manage your store inventory and orders</p>
          </div>
          <button
            onClick={() => setIsAdmin(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-lg transition text-sm"
          >
            Exit Admin
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-extrabold text-gray-900">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-extrabold text-gray-900">{totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-extrabold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-extrabold text-gray-900">{lowStockProducts.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${
              activeTab === 'products'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${
              activeTab === 'orders'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`px-5 py-3 font-semibold text-sm transition border-b-2 ${
              activeTab === 'add'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            + Add Product
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Stock</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-10 h-10 rounded object-cover" />
                          <span className="font-medium text-gray-900 text-sm truncate max-w-[200px]">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{product.category}</span>
                      </td>
                      <td className="px-4 py-3 font-semibold text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={product.stock}
                            onChange={e => updateStock(product.id, parseInt(e.target.value) || 0)}
                            className="w-16 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                            min="0"
                          />
                          {product.stock <= 5 && (
                            <span className="text-xs text-red-500 font-medium">Low!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProduct({ ...product })}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(product.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No orders yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Order ID</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Items</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-mono text-sm font-bold text-red-600">{order.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{order.customer.name}</p>
                            <p className="text-xs text-gray-500">{order.customer.email}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">{order.items.length} items</td>
                        <td className="px-4 py-3 font-bold">${order.total.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium capitalize">
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.name ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="e.g., AGV Pista GP RR Helmet"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.description ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="Product description..."
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.price ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="99.99"
                />
                {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  {categories.filter(c => c !== 'All').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.stock ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="50"
                />
                {formErrors.stock && <p className="text-red-500 text-xs mt-1">{formErrors.stock}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                  className={`w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500 ${formErrors.image ? 'border-red-400' : 'border-gray-200'}`}
                  placeholder="https://..."
                />
                {formErrors.image && <p className="text-red-500 text-xs mt-1">{formErrors.image}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={newProduct.rating}
                  onChange={e => setNewProduct({ ...newProduct, rating: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  checked={newProduct.featured}
                  onChange={e => setNewProduct({ ...newProduct, featured: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                />
                <label className="text-sm font-medium text-gray-700">Featured Product</label>
              </div>
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Edit Product</h3>
                <button onClick={() => setEditingProduct(null)} className="text-gray-400 hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleUpdateProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={editingProduct.price}
                      onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {categories.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingProduct.featured}
                    onChange={e => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <label className="text-sm font-medium text-gray-700">Featured Product</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-lg transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Product?</h3>
              <p className="text-gray-500 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2.5 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
