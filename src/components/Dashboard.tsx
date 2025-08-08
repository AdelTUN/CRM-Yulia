import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockDashboardStats, mockBookings, mockCustomers } from '../data/mockData';
import { format } from 'date-fns';
import { translations } from '../data/translations';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [language] = useState<'en' | 'ru'>('ru');
  const t = translations[language];
  const stats = [
    {
      name: t.totalCustomers,
      value: mockDashboardStats.totalCustomers,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      name: t.totalBookings,
      value: mockDashboardStats.totalBookings,
      icon: Calendar,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      name: t.monthlyRevenue,
      value: `$${mockDashboardStats.monthlyRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+15%',
      changeType: 'positive'
    },
    {
      name: t.activeTours,
      value: mockDashboardStats.activeTours,
      icon: MapPin,
      color: 'bg-orange-500',
      change: '+2',
      changeType: 'positive'
    }
  ];

  const recentBookings = mockBookings.slice(0, 5);
  const recentCustomers = mockCustomers.slice(0, 3);

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
        return <AlertCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-2">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.welcomeBack}</h1>
            <p className="text-gray-600 mt-1">{t.welcomeSubtitle}</p>
          </div>
                      <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>{t.revenueUp}</span>
            </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{t.fromLastMonth}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Recent Bookings */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 ${getStatusColor(booking.status)} rounded-full flex items-center justify-center`}>
                    {getStatusIcon(booking.status)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Booking #{booking.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(booking.date, 'MMM dd, yyyy')} • {booking.participants} participants
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">${booking.totalPrice}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Customers */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t.recentCustomers}</h3>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              {t.viewAll}
            </button>
          </div>
          <div className="space-y-4">
            {recentCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-700">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                    <p className="text-xs text-gray-500">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    customer.status === 'active' ? 'bg-green-100 text-green-800' :
                    customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.quickActions}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/customers')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
          >
            <Users className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">{t.addNewCustomer}</span>
          </button>
          <button 
            onClick={() => navigate('/bookings')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
          >
            <Calendar className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">{t.createBooking}</span>
          </button>
          <button 
            onClick={() => navigate('/tours')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
          >
            <MapPin className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-600">{t.addNewTour}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 