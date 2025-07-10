import React, { useState, useEffect } from 'react';
import { User, ShoppingBag, Building, PlusCircle, Eye, Search, Filter, ThumbsUp, ThumbsDown, MapPin, Calendar, DollarSign, TrendingUp, Shield, Database, Camera, Link, MessageSquare, BarChart3, Settings, Bell, Activity, Globe, Users, Monitor, Zap, Clock, Star, Award, Smartphone, Wifi, CreditCard, ChevronDown, ChevronUp, Youtube, Instagram, Twitter, Facebook, ArrowUp, ArrowDown, TrendingDown, Gift, Wallet, AlertCircle, CheckCircle, XCircle, Pause, Play, SlidersHorizontal, Hash, Tag, RefreshCw, ExternalLink, Share2, SortDesc, SortAsc, Music } from 'lucide-react';

const InVuDashboard = () => {
  const [userType, setUserType] = useState('user');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showNotifications, setShowNotifications] = useState(false);
  const [isEarningsEnabled, setIsEarningsEnabled] = useState(true);
  
  // Real-time earnings data
  const [realtimeEarnings, setRealtimeEarnings] = useState({
    today: 2.87,
    week: 18.45,
    month: 67.23,
    total: 1234.56
  });
  
  // Automated data interactions with earnings
  const [dataInteractions, setDataInteractions] = useState([
    {
      id: 1,
      type: "Ad Targeting",
      description: "Your shopping behavior data used for Nike shoe advertisement",
      platform: "Instagram",
      platformIcon: Instagram,
      dataType: "Browsing History",
      earnings: 0.45,
      timestamp: "2 minutes ago",
      status: "active",
      audience: "Fashion Enthusiasts",
      engagement: "8.2K views",
      location: "US/Canada",
      category: "Shopping",
      tags: ["Fashion", "Sports", "Demographics"],
      accessCount: 847,
      confidenceScore: 96,
      severity: "low"
    },
    {
      id: 2,
      type: "Location Targeting",
      description: "Your location data used for local restaurant recommendations",
      platform: "YouTube",
      platformIcon: Youtube,
      dataType: "Location History",
      earnings: 0.32,
      timestamp: "5 minutes ago",
      status: "active",
      audience: "Food Enthusiasts",
      engagement: "3.1K views",
      location: "Local Area",
      category: "Location Services",
      tags: ["Food", "Local", "Recommendations"],
      accessCount: 1205,
      confidenceScore: 89,
      severity: "medium"
    },
    {
      id: 3,
      type: "Content Recommendation",
      description: "Your music listening history used for playlist curation",
      platform: "Spotify",
      platformIcon: Music,
      dataType: "Music Preferences",
      earnings: 0.28,
      timestamp: "8 minutes ago",
      status: "active",
      audience: "Music Listeners",
      engagement: "2.8K plays",
      location: "Global",
      category: "Entertainment",
      tags: ["Music", "Preferences", "Curation"],
      accessCount: 2134,
      confidenceScore: 94,
      severity: "low"
    },
    {
      id: 4,
      type: "Social Media Advertising",
      description: "Your social interactions analyzed for friend recommendations",
      platform: "Facebook",
      platformIcon: Facebook,
      dataType: "Social Graph",
      earnings: 0.52,
      timestamp: "12 minutes ago",
      status: "active",
      audience: "Social Network",
      engagement: "5.7K interactions",
      location: "Friends Network",
      category: "Social Media",
      tags: ["Social", "Network", "Recommendations"],
      accessCount: 3456,
      confidenceScore: 87,
      severity: "medium"
    },
    {
      id: 5,
      type: "E-commerce Targeting",
      description: "Your purchase history used for product recommendations",
      platform: "Amazon",
      platformIcon: ShoppingBag,
      dataType: "Purchase History",
      earnings: 0.65,
      timestamp: "15 minutes ago",
      status: "active",
      audience: "Shoppers",
      engagement: "12.3K views",
      location: "Global",
      category: "Shopping",
      tags: ["E-commerce", "Recommendations", "Purchase"],
      accessCount: 5678,
      confidenceScore: 91,
      severity: "low"
    }
  ]);
  
  // Real-time earnings notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'earnings',
      message: 'You earned $0.45 from Nike ad targeting using your shopping data',
      amount: 0.45,
      platform: 'Instagram',
      time: '2 minutes ago',
      read: false,
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'earnings',
      message: 'You earned $0.32 from location-based restaurant recommendations',
      amount: 0.32,
      platform: 'YouTube',
      time: '5 minutes ago',
      read: false,
      icon: DollarSign,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'milestone',
      message: 'You\'ve reached $50 in monthly earnings!',
      time: '1 hour ago',
      read: false,
      icon: Award,
      color: 'text-blue-500'
    }
  ]);
  
  // Platform earnings breakdown
  const platformEarnings = [
    { platform: 'Instagram', earnings: 8.45, icon: Instagram, color: 'text-pink-500', growth: '+12%' },
    { platform: 'YouTube', earnings: 6.23, icon: Youtube, color: 'text-red-500', growth: '+8%' },
    { platform: 'Facebook', earnings: 5.67, icon: Facebook, color: 'text-blue-500', growth: '+15%' },
    { platform: 'Amazon', earnings: 4.89, icon: ShoppingBag, color: 'text-orange-500', growth: '+5%' },
    { platform: 'Spotify', earnings: 3.21, icon: Music, color: 'text-green-500', growth: '+22%' }
  ];
  
  const categories = [
    { id: 'all', label: 'All Interactions', icon: Globe },
    { id: 'Shopping', label: 'Shopping', icon: ShoppingBag },
    { id: 'Location Services', label: 'Location', icon: MapPin },
    { id: 'Entertainment', label: 'Entertainment', icon: Monitor },
    { id: 'Social Media', label: 'Social Media', icon: Users },
    { id: 'Privacy', label: 'Privacy Concerns', icon: Shield }
  ];

  // Helper functions
  const handleVote = (interactionId, voteType) => {
    setDataInteractions(dataInteractions.map(interaction => 
      interaction.id === interactionId 
        ? { 
            ...interaction, 
            votes: interaction.hasVoted ? interaction.votes : (interaction.votes || 0) + (voteType === 'up' ? 1 : -1),
            hasVoted: !interaction.hasVoted
          }
        : interaction
    ));
  };
  
  const filteredInteractions = dataInteractions.filter(interaction => {
    const matchesSearch = interaction.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         interaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || interaction.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const sortedInteractions = [...filteredInteractions].sort((a, b) => {
    switch(sortBy) {
      case 'newest': return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest': return new Date(a.timestamp) - new Date(b.timestamp);
      case 'highest-earnings': return b.earnings - a.earnings;
      case 'most-accessed': return b.accessCount - a.accessCount;
      default: return 0;
    }
  });
  
  const unreadNotifications = notifications.filter(notif => !notif.read).length;
  
  // Real-time earnings updates
  useEffect(() => {
    if (!isEarningsEnabled) return;
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newEarning = Math.round(Math.random() * 100) / 100;
        setRealtimeEarnings(prev => ({
          ...prev,
          today: prev.today + newEarning,
          week: prev.week + newEarning,
          month: prev.month + newEarning,
          total: prev.total + newEarning
        }));
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [isEarningsEnabled]);

  // Basic layout and navigation
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Database className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">InVu</span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'overview' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('interactions')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'interactions' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Data Interactions
                </button>
                <button
                  onClick={() => setActiveTab('earnings')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'earnings' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Earnings
                </button>
                <button
                  onClick={() => setActiveTab('report')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'report' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Report Issue
                </button>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-400 hover:text-gray-500"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadNotifications}
                </span>
              </button>
              <div className="flex items-center space-x-2">
                <User className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">User Account</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Data Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor your data usage, earnings, and privacy settings in real-time
          </p>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Real-time Earnings Overview */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Real-time Earnings</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEarningsEnabled(!isEarningsEnabled)}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      isEarningsEnabled 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {isEarningsEnabled ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                    <span>{isEarningsEnabled ? 'Active' : 'Paused'}</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Today</p>
                      <p className="text-2xl font-bold text-green-600">${realtimeEarnings.today.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Week</p>
                      <p className="text-2xl font-bold text-blue-600">${realtimeEarnings.week.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold text-purple-600">${realtimeEarnings.month.toFixed(2)}</p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earned</p>
                      <p className="text-2xl font-bold text-orange-600">${realtimeEarnings.total.toFixed(2)}</p>
                    </div>
                    <Wallet className="w-8 h-8 text-orange-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Earnings and Platform Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Recent Earnings</h3>
                <div className="space-y-3">
                  {dataInteractions.slice(0, 4).map(interaction => (
                    <div key={interaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <interaction.platformIcon className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="text-sm font-medium">{interaction.type}</p>
                          <p className="text-xs text-gray-500">{interaction.platform} • {interaction.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">+${interaction.earnings}</p>
                        <p className="text-xs text-gray-500">{interaction.engagement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Top Earning Platforms</h3>
                <div className="space-y-3">
                  {platformEarnings.map((platform, index) => (
                    <div key={platform.platform} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <platform.icon className={`w-5 h-5 ${platform.color}`} />
                        <div>
                          <p className="text-sm font-medium">{platform.platform}</p>
                          <p className="text-xs text-gray-500">This week</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">${platform.earnings}</p>
                        <p className="text-xs text-green-600">{platform.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'interactions' && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search data interactions..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.label}</option>
                    ))}
                  </select>
                  
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest-earnings">Highest Earnings</option>
                    <option value="most-accessed">Most Accessed</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Data Interactions List */}
            <div className="space-y-4">
              {sortedInteractions.map(interaction => (
                <div key={interaction.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <interaction.platformIcon className="w-6 h-6 text-gray-600" />
                        <div>
                          <h3 className="font-semibold text-gray-800">{interaction.type}</h3>
                          <p className="text-sm text-gray-500">{interaction.platform} • {interaction.timestamp}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                            +${interaction.earnings}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            interaction.severity === 'low' ? 'bg-green-100 text-green-700' :
                            interaction.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {interaction.severity}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{interaction.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Database className="w-4 h-4" />
                          <span>{interaction.dataType}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{interaction.audience}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{interaction.engagement}</span>
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        {interaction.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleVote(interaction.id, 'up')}
                        className="flex items-center space-x-1 px-3 py-1 text-sm rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Good</span>
                      </button>
                      <button
                        onClick={() => handleVote(interaction.id, 'down')}
                        className="flex items-center space-x-1 px-3 py-1 text-sm rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        <span className="text-red-500">Concerned</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Earnings Analytics Coming Soon
              </h2>
              <p className="text-gray-600">
                Detailed earnings analytics and payout history will be available in the next update.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'report' && (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Report Privacy Issues
              </h2>
              <p className="text-gray-600">
                Privacy reporting and issue management features will be available in the next update.
              </p>
            </div>
          </div>
        )}

        {/* Instructions for Continuing */}
        <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">🔧 Development Status & Instructions</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p><strong>✅ Completed:</strong> Overview tab with real-time earnings, Data Interactions tab with search/filter/voting</p>
            <p><strong>⏳ Still Needed:</strong> Earnings Analytics tab, Report Issues tab, Notifications dropdown, Real-time updates</p>
            <p><strong>📋 To Continue:</strong> Copy this code to a new conversation and ask: "Complete the remaining tabs and features for the InVu Dashboard"</p>
            <p><strong>🎯 Next Steps:</strong> Add detailed earnings analytics, payout history, privacy reporting form, and notification system</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InVuDashboard;