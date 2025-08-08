import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  BarChart3, 
  Settings,
  Menu,
  X,
  DollarSign,
  Globe
} from 'lucide-react';
import { useState } from 'react';
import { translations } from '../data/translations';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const t = translations[language];
  
  const navigation = [
    { name: t.dashboard, href: '/', icon: Home },
    { name: t.customers, href: '/customers', icon: Users },
    { name: t.tours, href: '/tours', icon: MapPin },
    { name: t.bookings, href: '/bookings', icon: Calendar },
    { name: t.analytics, href: '/analytics', icon: BarChart3 },
    { name: t.commission, href: '/commission', icon: DollarSign },
    { name: t.settings, href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-48 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-12 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-6 h-6 bg-primary-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h1 className="ml-2 text-lg font-bold text-gray-900">Tour CRM</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-4 px-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`sidebar-link ${isActive ? 'active' : 'text-gray-600'}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-12 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-gray-900">
                  {navigation.find(item => item.href === location.pathname)?.name || t.dashboard}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Globe className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {language === 'ru' ? '🇷🇺 RU' : '🇺🇸 EN'}
                  </span>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={() => {
                        setLanguage('ru');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        language === 'ru' ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      🇷🇺 Русский
                    </button>
                    <button
                      onClick={() => {
                        setLanguage('en');
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                        language === 'en' ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-700">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 