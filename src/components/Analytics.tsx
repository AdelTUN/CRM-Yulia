import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Calendar,
  BarChart3
} from 'lucide-react';
import { mockBookings, mockCustomers, mockTours } from '../data/mockData';

const Analytics: React.FC = () => {
  const totalRevenue = mockBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const confirmedBookings = mockBookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
  
  const monthlyData = [
    { month: 'Jan', bookings: 12, revenue: 2400 },
    { month: 'Feb', bookings: 19, revenue: 3800 },
    { month: 'Mar', bookings: 15, revenue: 3000 },
    { month: 'Apr', bookings: 22, revenue: 4400 },
    { month: 'May', bookings: 28, revenue: 5600 },
    { month: 'Jun', bookings: 35, revenue: 7000 },
  ];

  const topTours = mockTours.map(tour => {
    const tourBookings = mockBookings.filter(b => b.tourId === tour.id);
    const tourRevenue = tourBookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
    return {
      ...tour,
      bookings: tourBookings.length,
      revenue: tourRevenue
    };
  }).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const customerStats = {
    total: mockCustomers.length,
    active: mockCustomers.filter(c => c.status === 'active').length,
    prospects: mockCustomers.filter(c => c.status === 'prospect').length,
    inactive: mockCustomers.filter(c => c.status === 'inactive').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your business performance and insights.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+12.5%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+8.2%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customerStats.active}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5.3%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">68%</p>
              <div className="flex items-center mt-2">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">-2.1%</span>
                <span className="text-sm text-gray-500 ml-1">from last month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(data.revenue / 7000) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900">${data.revenue.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Active Customers</span>
              </div>
              <div className="text-sm font-medium text-gray-900">{customerStats.active}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Prospects</span>
              </div>
              <div className="text-sm font-medium text-gray-900">{customerStats.prospects}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Inactive</span>
              </div>
              <div className="text-sm font-medium text-gray-900">{customerStats.inactive}</div>
            </div>
          </div>
          
          {/* Pie Chart Placeholder */}
          <div className="mt-6 flex justify-center">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Tours */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Tours</h3>
        <div className="space-y-4">
          {topTours.map((tour, index) => (
            <div key={tour.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">{index + 1}</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{tour.name}</div>
                  <div className="text-xs text-gray-500">{tour.location}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">${tour.revenue.toLocaleString()}</div>
                <div className="text-xs text-gray-500">{tour.bookings} bookings</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Revenue increased by 15% this month</p>
                <p className="text-xs text-gray-500">Due to higher booking rates and new tour offerings</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Customer retention rate at 85%</p>
                <p className="text-xs text-gray-500">Excellent customer satisfaction and repeat bookings</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Adventure tours most popular</p>
                <p className="text-xs text-gray-500">Mountain Adventure Hike leads in bookings</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-700">Generate Monthly Report</span>
                <BarChart3 className="w-4 h-4 text-primary-600" />
              </div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Export Customer Data</span>
                <Users className="w-4 h-4 text-green-600" />
              </div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700">View Revenue Analytics</span>
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 