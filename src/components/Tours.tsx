import React, { useState } from 'react';
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
  Star
} from 'lucide-react';
import { mockTours } from '../data/mockData';

const Tours: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredTours = mockTours.filter(tour => {
    const matchesSearch = tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tour.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Tours</h1>
          <p className="text-gray-600 mt-1">Manage your tour offerings and itineraries.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary mt-4 sm:mt-0 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tour
        </button>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tours..."
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
            <option value="all">All Categories</option>
            <option value="adventure">Adventure</option>
            <option value="cultural">Cultural</option>
            <option value="nature">Nature</option>
            <option value="city">City</option>
            <option value="food">Food & Wine</option>
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
                  <button className="text-primary-600 hover:text-primary-900 p-1">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 p-1">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900 p-1">
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
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tours found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
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
              <p className="text-sm font-medium text-gray-600">Total Tours</p>
              <p className="text-2xl font-bold text-gray-900">{mockTours.length}</p>
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
                {mockTours.filter(t => t.isActive).length}
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
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ${Math.round(mockTours.reduce((sum, tour) => sum + tour.price, 0) / mockTours.length)}
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
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {new Set(mockTours.map(t => t.category)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Tour Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Tour</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name</label>
                <input type="text" className="input-field" placeholder="Enter tour name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="input-field" rows={3} placeholder="Enter tour description"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" className="input-field" placeholder="e.g., 3 hours" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" className="input-field" placeholder="Enter price" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input type="text" className="input-field" placeholder="Enter location" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="input-field">
                  <option value="">Select category</option>
                  <option value="adventure">Adventure</option>
                  <option value="cultural">Cultural</option>
                  <option value="nature">Nature</option>
                  <option value="city">City</option>
                  <option value="food">Food & Wine</option>
                </select>
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
                onClick={() => {
                  // Here you would add the tour logic
                  setShowAddModal(false);
                  alert('Tour added successfully!');
                }}
                className="btn-primary"
              >
                Add Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours; 