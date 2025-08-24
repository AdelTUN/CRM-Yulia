import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Calendar, 
  Users, 
  DollarSign,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  X
} from 'lucide-react';
import { mockBookings, mockCustomers, mockTours } from '../data/mockData';
import { format } from 'date-fns';
import { translations } from '../data/translations';

const Bookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [customers, setCustomers] = useState(mockCustomers);
  const [tours, setTours] = useState(mockTours);
  const [language] = useState<'en' | 'ru'>('ru');
  const t = translations[language];

  // Form states for add/edit
  const [formData, setFormData] = useState({
    customerId: '',
    tourId: '',
    date: '',
    participants: 1,
    specialRequests: '',
    status: 'pending' as 'confirmed' | 'pending' | 'cancelled' | 'completed'
  });

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('crm-bookings');
    const savedCustomers = localStorage.getItem('crm-customers');
    const savedTours = localStorage.getItem('crm-tours');
    
    if (savedBookings) {
      try {
        const parsedBookings = JSON.parse(savedBookings);
        const bookingsWithDates = parsedBookings.map((booking: any) => ({
          ...booking,
          date: new Date(booking.date),
          createdAt: new Date(booking.createdAt)
        }));
        setBookings(bookingsWithDates);
      } catch (error) {
        console.error('Error loading bookings from localStorage:', error);
        setBookings(mockBookings);
      }
    } else {
      localStorage.setItem('crm-bookings', JSON.stringify(mockBookings));
    }

    if (savedCustomers) {
      try {
        const parsedCustomers = JSON.parse(savedCustomers);
        const customersWithDates = parsedCustomers.map((customer: any) => ({
          ...customer,
          createdAt: new Date(customer.createdAt),
          lastContact: new Date(customer.lastContact)
        }));
        setCustomers(customersWithDates);
      } catch (error) {
        console.error('Error loading customers from localStorage:', error);
        setCustomers(mockCustomers);
      }
    }

    if (savedTours) {
      try {
        const parsedTours = JSON.parse(savedTours);
        setTours(parsedTours);
      } catch (error) {
        console.error('Error loading tours from localStorage:', error);
        setTours(mockTours);
      }
    }
  }, []);

  // Save bookings to localStorage whenever bookings state changes
  useEffect(() => {
    localStorage.setItem('crm-bookings', JSON.stringify(bookings));
  }, [bookings]);

  const filteredBookings = bookings.filter(booking => {
    const customer = customers.find(c => c.id === booking.customerId);
    const tour = tours.find(t => t.id === booking.tourId);
    const matchesSearch = customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const handleEditBooking = (booking: any) => {
    setSelectedBooking(booking);
    setFormData({
      customerId: booking.customerId,
      tourId: booking.tourId,
      date: format(booking.date, 'yyyy-MM-dd'),
      participants: booking.participants,
      specialRequests: booking.specialRequests,
      status: booking.status
    });
    setShowEditModal(true);
  };

  const handleDeleteBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setBookings(bookings.filter(b => b.id !== selectedBooking.id));
    setShowDeleteModal(false);
    setSelectedBooking(null);
  };

  const handleSaveEdit = () => {
    const tour = tours.find(t => t.id === formData.tourId);
    const totalPrice = tour ? tour.price * formData.participants : 0;
    
    setBookings(bookings.map(b => 
      b.id === selectedBooking.id 
        ? { 
            ...b, 
            ...formData, 
            date: new Date(formData.date),
            totalPrice
          }
        : b
    ));
    setShowEditModal(false);
    setSelectedBooking(null);
    setFormData({ customerId: '', tourId: '', date: '', participants: 1, specialRequests: '', status: 'pending' });
  };

  const handleAddBooking = () => {
    const tour = tours.find(t => t.id === formData.tourId);
    const totalPrice = tour ? tour.price * formData.participants : 0;
    
    const newBooking = {
      id: Date.now().toString(),
      ...formData,
      date: new Date(formData.date),
      totalPrice,
      createdAt: new Date()
    };
    setBookings([...bookings, newBooking]);
    setShowAddModal(false);
    setFormData({ customerId: '', tourId: '', date: '', participants: 1, specialRequests: '', status: 'pending' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.bookings}</h1>
          <p className="text-gray-600 mt-1">{t.manageBookings}</p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button 
            onClick={() => {
              if (window.confirm('Reset to default data? This will remove all custom changes.')) {
                localStorage.removeItem('crm-bookings');
                setBookings(mockBookings);
              }
            }}
            className="btn-secondary flex items-center"
            title="Reset to default data"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Reset
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.newBooking}
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
                placeholder={t.searchBookings}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="all">All Status</option>
            <option value="confirmed">{t.confirmed}</option>
            <option value="pending">{t.pending}</option>
            <option value="cancelled">{t.cancelled}</option>
            <option value="completed">{t.completed}</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Participants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => {
                const customer = customers.find(c => c.id === booking.customerId);
                const tour = tours.find(t => t.id === booking.tourId);
                
                return (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary-700" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">#{booking.id}</div>
                          <div className="text-sm text-gray-500">{format(booking.createdAt, 'MMM dd, yyyy')}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-700">
                            {customer?.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{customer?.name}</div>
                          <div className="text-sm text-gray-500">{customer?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{tour?.name}</div>
                        <div className="text-sm text-gray-500">{tour?.location}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-900">
                          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                          {format(booking.date, 'MMM dd, yyyy')}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users className="w-4 h-4 mr-2 text-gray-400" />
                          {booking.participants} participants
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${getStatusColor(booking.status)} rounded-full flex items-center justify-center mr-2`}>
                          {getStatusIcon(booking.status)}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-bold text-gray-900">${booking.totalPrice}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewBooking(booking)}
                          className="text-primary-600 hover:text-primary-900 p-1"
                          title="View booking details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEditBooking(booking)}
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="Edit booking"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteBooking(booking)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Delete booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noBookingsFound}</h3>
            <p className="text-gray-500">{t.tryAdjustingSearch}</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter(b => b.status === 'pending').length}
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
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${bookings.reduce((sum, booking) => sum + booking.totalPrice, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Create New Booking</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select 
                  className="input-field"
                  value={formData.customerId}
                  onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                >
                  <option value="">Select customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour</label>
                <select 
                  className="input-field"
                  value={formData.tourId}
                  onChange={(e) => setFormData({...formData, tourId: e.target.value})}
                >
                  <option value="">Select tour</option>
                  {tours.map(tour => (
                    <option key={tour.id} value={tour.id}>{tour.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="input-field"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="Number of participants" 
                  min="1"
                  value={formData.participants}
                  onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'confirmed' | 'pending' | 'cancelled' | 'completed'})}
                >
                  <option value="pending">{t.pending}</option>
                  <option value="confirmed">{t.confirmed}</option>
                  <option value="completed">{t.completed}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea 
                  className="input-field" 
                  rows={3} 
                  placeholder="Any special requests or notes"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                ></textarea>
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
                onClick={handleAddBooking}
                className="btn-primary"
                disabled={!formData.customerId || !formData.tourId || !formData.date}
              >
                Create Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Booking Modal */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary-700" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">#{selectedBooking.id}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer</label>
                  <p className="text-sm text-gray-900">
                    {customers.find(c => c.id === selectedBooking.customerId)?.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tour</label>
                  <p className="text-sm text-gray-900">
                    {tours.find(t => t.id === selectedBooking.tourId)?.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="text-sm text-gray-900">{format(selectedBooking.date, 'MMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Participants</label>
                    <p className="text-sm text-gray-900">{selectedBooking.participants}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Price</label>
                  <p className="text-sm text-gray-900">${selectedBooking.totalPrice}</p>
                </div>
                {selectedBooking.specialRequests && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Special Requests</label>
                    <p className="text-sm text-gray-900">{selectedBooking.specialRequests}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="text-sm text-gray-900">{format(selectedBooking.createdAt, 'MMM dd, yyyy')}</p>
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

      {/* Edit Booking Modal */}
      {showEditModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Booking</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select 
                  className="input-field"
                  value={formData.customerId}
                  onChange={(e) => setFormData({...formData, customerId: e.target.value})}
                >
                  <option value="">Select customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tour</label>
                <select 
                  className="input-field"
                  value={formData.tourId}
                  onChange={(e) => setFormData({...formData, tourId: e.target.value})}
                >
                  <option value="">Select tour</option>
                  {tours.map(tour => (
                    <option key={tour.id} value={tour.id}>{tour.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" 
                  className="input-field"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Participants</label>
                <input 
                  type="number" 
                  className="input-field" 
                  placeholder="Number of participants" 
                  min="1"
                  value={formData.participants}
                  onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="input-field"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as 'confirmed' | 'pending' | 'cancelled' | 'completed'})}
                >
                  <option value="pending">{t.pending}</option>
                  <option value="confirmed">{t.confirmed}</option>
                  <option value="completed">{t.completed}</option>
                  <option value="cancelled">{t.cancelled}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea 
                  className="input-field" 
                  rows={3} 
                  placeholder="Any special requests or notes"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                ></textarea>
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
                disabled={!formData.customerId || !formData.tourId || !formData.date}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Booking</h3>
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
                  You are about to delete booking <strong>#{selectedBooking.id}</strong> from your booking list.
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
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings; 