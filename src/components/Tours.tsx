import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Edit,
  Trash2,
  Eye,
  Star,
  X
} from 'lucide-react';
import { mockTours } from '../data/mockData';
import { translations } from '../data/translations';

const Tours: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [tours, setTours] = useState(mockTours);
  const [language] = useState<'en' | 'ru'>('ru');
  const t = translations[language];

  // Form states for add/edit
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    price: 0,
    maxCapacity: 10,
    location: '',
    category: 'city' as 'adventure' | 'cultural' | 'nature' | 'city' | 'food',
    isActive: true
  });

  // Load tours from localStorage on component mount
  useEffect(() => {
    const savedTours = localStorage.getItem('crm-tours');
    if (savedTours) {
      try {
        const parsedTours = JSON.parse(savedTours);
        setTours(parsedTours);
      } catch (error) {
        console.error('Error loading tours from localStorage:', error);
        setTours(mockTours);
      }
    } else {
      localStorage.setItem('crm-tours', JSON.stringify(mockTours));
    }
  }, []);

  // Save tours to localStorage whenever tours state changes
  useEffect(() => {
    localStorage.setItem('crm-tours', JSON.stringify(tours));
  }, [tours]);

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewTour = (tour: any) => {
    setSelectedTour(tour);
    setShowViewModal(true);
  };

  const handleEditTour = (tour: any) => {
    setSelectedTour(tour);
    setFormData({
      name: tour.name,
      description: tour.description,
      duration: tour.duration,
      price: tour.price,
      maxCapacity: tour.maxCapacity,
      location: tour.location,
      category: tour.category,
      isActive: tour.isActive
    });
    setShowEditModal(true);
  };

  const handleDeleteTour = (tour: any) => {
    setSelectedTour(tour);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setTours(tours.filter(t => t.id !== selectedTour.id));
    setShowDeleteModal(false);
    setSelectedTour(null);
  };

  const handleSaveEdit = () => {
    setTours(tours.map(t => 
      t.id === selectedTour.id 
        ? { ...t, ...formData }
        : t
    ));
    setShowEditModal(false);
    setSelectedTour(null);
    setFormData({ name: '', description: '', duration: '', price: 0, maxCapacity: 10, location: '', category: 'city', isActive: true });
  };

  const handleAddTour = () => {
    const newTour = {
      id: Date.now().toString(),
      ...formData
    };
    setTours([...tours, newTour]);
    setShowAddModal(false);
    setFormData({ name: '', description: '', duration: '', price: 0, maxCapacity: 10, location: '', category: 'city', isActive: true });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'adventure':
        return 'bg-orange-100 text-orange-800';
      case 'cultural':
        return 'bg-purple-100 text-purple-800';
      case 'nature':
        return 'bg-green-100 text-green-800';
      case 'city':
        return 'bg-blue-100 text-blue-800';
      case 'food':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'adventure':
        return '🏔️';
      case 'cultural':
        return '🏛️';
      case 'nature':
        return '🌿';
      case 'city':
        return '🏙️';
      case 'food':
        return '🍽️';
      default:
        return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.tours}</h1>
          <p className="text-gray-600 mt-1">{t.manageTours}</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => {
              if (window.confirm('Reset to default data? This will remove all custom changes.')) {
                localStorage.removeItem('crm-tours');
                setTours(mockTours);
              }
            }}
            className="btn-secondary flex items-center"
            title="Reset to default data"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addTour}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder={t.searchTours}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="all">{t.allCategories}</option>
            <option value="adventure">{t.adventure}</option>
            <option value="cultural">{t.cultural}</option>
            <option value="nature">{t.nature}</option>
            <option value="city">{t.city}</option>
            <option value="food">{t.food}</option>
          </select>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTours.map((tour) => (
          <div key={tour.id} className="card hover:shadow-lg transition-shadow duration-200">
            <div className="relative">
              {/* Tour Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">{getCategoryIcon(tour.category)}</span>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  tour.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {tour.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tour.category)}`}>
                  {tour.category}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{tour.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{tour.description}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {tour.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {tour.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  Max {tour.maxCapacity} participants
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-lg font-bold text-gray-900">${tour.price}</span>
                  <span className="text-sm text-gray-500 ml-1">per person</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleViewTour(tour)}
                    className="text-primary-600 hover:text-primary-900 p-1"
                    title="View tour details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleEditTour(tour)}
                    className="text-gray-600 hover:text-gray-900 p-1"
                    title="Edit tour"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTour(tour)}
                    className="text-red-600 hover:text-red-900 p-1"
                    title="Delete tour"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTours.length === 0 && (
        <div className="card">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noToursFound}</h3>
            <p className="text-gray-500">{t.tryAdjustingSearch}</p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.totalTours}</p>
              <p className="text-2xl font-bold text-gray-900">{tours.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Tours</p>
              <p className="text-2xl font-bold text-gray-900">
                {tours.filter(t => t.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.avgPrice}</p>
              <p className="text-2xl font-bold text-gray-900">
                ${Math.round(tours.reduce((sum, tour) => sum + tour.price, 0) / tours.length)}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.categories}</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(tours.map(t => t.category)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Tour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{t.addTour}</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter tour name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="input-field" 
                  rows={3} 
                  placeholder="Enter tour description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g., 3 hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="10"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value) || 10})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'adventure' | 'cultural' | 'nature' | 'city' | 'food'})}
                >
                  <option value="adventure">{t.adventure}</option>
                  <option value="cultural">{t.cultural}</option>
                  <option value="nature">{t.nature}</option>
                  <option value="city">{t.city}</option>
                  <option value="food">{t.food}</option>
                </select>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active Tour
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddTour}
                className="btn-primary"
                disabled={!formData.name || !formData.description}
              >
                {t.addTour}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Tour Modal */}
      {showViewModal && selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Tour Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">{getCategoryIcon(selectedTour.category)}</span>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">{selectedTour.name}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(selectedTour.category)}`}>
                    {selectedTour.category}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedTour.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-sm text-gray-900">{selectedTour.duration}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <p className="text-sm text-gray-900">${selectedTour.price} per person</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-sm text-gray-900">{selectedTour.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Capacity</label>
                    <p className="text-sm text-gray-900">{selectedTour.maxCapacity} participants</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedTour.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedTour.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button 
                onClick={() => setShowViewModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Tour Modal */}
      {showEditModal && selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Tour</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="Enter tour name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="input-field" 
                  rows={3} 
                  placeholder="Enter tour description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g., 3 hours"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Capacity</label>
                  <input 
                    type="number" 
                    className="input-field" 
                    placeholder="10"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({...formData, maxCapacity: parseInt(e.target.value) || 10})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="input-field"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'adventure' | 'cultural' | 'nature' | 'city' | 'food'})}
                >
                  <option value="adventure">{t.adventure}</option>
                  <option value="cultural">{t.cultural}</option>
                  <option value="nature">{t.nature}</option>
                  <option value="city">{t.city}</option>
                  <option value="food">{t.food}</option>
                </select>
              </div>
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="isActiveEdit"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveEdit" className="ml-2 block text-sm text-gray-900">
                  Active Tour
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowEditModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="btn-primary"
                disabled={!formData.name || !formData.description}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Tour</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">Are you sure?</h4>
                  <p className="text-sm text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  You are about to delete <strong>{selectedTour.name}</strong> from your tour list.
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
              >
                Delete Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours; 