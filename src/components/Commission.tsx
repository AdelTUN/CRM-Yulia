import React, { useState } from 'react';
import { 
  Search, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download
} from 'lucide-react';
import { mockCommissions } from '../data/mockData';
import { format } from 'date-fns';
import { translations } from '../data/translations';

const Commission: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const t = translations[language];

  const filteredCommissions = mockCommissions.filter(commission => {
    const matchesSearch = commission.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || commission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'overdue':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const totalCommission = mockCommissions.reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const paidCommission = mockCommissions.filter(c => c.status === 'paid').reduce((sum, commission) => sum + commission.commissionAmount, 0);
  const pendingCommission = mockCommissions.filter(c => c.status === 'pending').reduce((sum, commission) => sum + commission.commissionAmount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t.commission}</h1>
          <p className="text-gray-600 mt-1">{t.commissionSettings}</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ru')}
            className="input-field max-w-xs"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
          <button className="btn-primary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            {t.commissionReport}
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
            <option value="all">{t.allStatus}</option>
            <option value="paid">{t.commissionPaid}</option>
            <option value="pending">{t.commissionPending}</option>
            <option value="overdue">{t.commissionOverdue}</option>
          </select>
        </div>
      </div>

      {/* Commission Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.totalCommission}</p>
              <p className="text-2xl font-bold text-gray-900">${totalCommission.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.commissionPaid}</p>
              <p className="text-2xl font-bold text-gray-900">${paidCommission.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t.commissionPending}</p>
              <p className="text-2xl font-bold text-gray-900">${pendingCommission.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Commission Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.tourCommission}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.customer}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.commissionRate}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.commissionAmount}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.commissionDate}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.commissionStatus}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommissions.map((commission) => (
                <tr key={commission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{commission.tourName}</div>
                      <div className="text-sm text-gray-500">${commission.bookingAmount}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{commission.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{(commission.commissionRate * 100).toFixed(1)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm font-bold text-gray-900">${commission.commissionAmount.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {format(commission.date, 'MMM dd, yyyy')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 ${getStatusColor(commission.status)} rounded-full flex items-center justify-center mr-2`}>
                        {getStatusIcon(commission.status)}
                      </div>
                                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                         {commission.status === 'paid' ? t.commissionPaid : 
                          commission.status === 'pending' ? t.commissionPending : 
                          commission.status === 'overdue' ? t.commissionOverdue : t.commissionPending}
                       </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCommissions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t.noBookingsFound}</h3>
            <p className="text-gray-500">{t.tryAdjustingSearch}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Commission; 