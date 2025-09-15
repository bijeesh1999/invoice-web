import { useState } from 'react';
import { Users, Package, FileText, Menu, Bell, Search, User, Settings } from 'lucide-react';

export default function AdminPanel() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Menu },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'invoices', label: 'Invoices', icon: FileText },
  ];

  const stats = [
    { title: 'Total Members', value: '2,847', change: '+12%', color: 'text-blue-600' },
    { title: 'Products', value: '1,234', change: '+5%', color: 'text-green-600' },
    { title: 'Invoices', value: '892', change: '+18%', color: 'text-purple-600' },
    { title: 'Revenue', value: '$45,890', change: '+23%', color: 'text-orange-600' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'members':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-600">Members section - Manage user accounts, permissions, and member information.</p>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Products Management</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-600">Products section - Add, edit, and manage your product catalog.</p>
            </div>
          </div>
        );
      case 'invoices':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Invoices Management</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <p className="text-gray-600">Invoices section - Create, send, and track your invoices.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
              <div className="text-sm text-gray-500">Last updated: 2 minutes ago</div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${stat.color}`}>
                      {stat.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-700">New member registration: John Smith</p>
                  <span className="text-sm text-gray-500">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <p className="text-gray-700">Product updated: Premium Package</p>
                  <span className="text-sm text-gray-500">15 minutes ago</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <p className="text-gray-700">Invoice #INV-2024-001 sent</p>
                  <span className="text-sm text-gray-500">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex-shrink-0`}>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            {isSidebarOpen && (
              <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
            )}
          </div>
        </div>
        
        <nav className="mt-8 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Menu size={24} />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <Settings size={20} />
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@company.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}