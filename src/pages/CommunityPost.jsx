// pages/CommunityPost.jsx
import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  ChevronDown,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Calendar,
  Users,
  Bell
} from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';

const CommunityPost = () => {
  const [activeTab, setActiveTab] = useState('New');
  const [showDropdown, setShowDropdown] = useState(false);

  // Mock data for the community
  const communityData = {
    title: 'Football Facilities',
    description: 'We a community that provides with great insights of maintaining your facility.',
    memberCount: 100,
    bannerImage: '🏈',
    bannerColor: 'bg-blue-600'
  };

  // Mock posts data
  const posts = [
    {
      id: 1,
      author: 'Jay Anderson',
      avatar: 'JA',
      content: 'I am offering 50% discount on my football pitch, order ends tomorrow',
      bookingLink: 'Jay Football Pitch',
      image: true,
      likes: 18,
      comments: 25,
      communityTag: 'Football Community'
    },
    {
      id: 2,
      author: 'Jay Anderson',
      avatar: 'JA',
      content: 'I am offering 50% discount on my football pitch, order ends tomorrow',
      bookingLink: 'Jay Football Pitch',
      image: true,
      likes: 18,
      comments: 25,
      communityTag: 'Football Community'
    }
  ];

  const tabs = ['New', 'Messages', 'Events', 'AMAs'];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderStadiumImage = () => (
    <div className="w-full h-48 bg-gradient-to-br from-cyan-400 via-blue-500 to-green-400 rounded-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute bottom-4 left-4 right-4">
        <div className="w-full h-2 bg-green-400 rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-cyan-400 rounded-full opacity-80"></div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
      </div>
      {/* Stadium structure */}
      <div className="absolute inset-x-4 top-4 bottom-8">
        <div className="w-full h-full border-2 border-white/30 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white/30 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 text-xl font-semibold hover:text-purple-600 transition-colors">
            <ChevronLeft size={28} />
            <span className="text-gray-600">Community</span>
            <span className="text-gray-400">›</span>
            <span>{communityData.title}</span>
          </button>
        </div>
        
        {/* <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <span className="font-medium">Abiodun Ayobami</span>
            <div className="w-8 h-8 bg-orange-400 rounded-full"></div>
            <ChevronDown size={20} className="text-gray-600" />
          </div>
        </div> */}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-8">
          {/* Community Banner */}
          <div className="bg-white rounded-lg overflow-hidden mb-6">
            <div className={`h-48 ${communityData.bannerColor} relative flex items-center justify-center`}>
              <div className="text-6xl">
                {communityData.bannerImage}
              </div>
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <MoreHorizontal className="text-white" size={20} />
                </button>
              </div>
            </div>
            
            {/* Community Info */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{communityData.title}</h1>
              <p className="text-gray-600 mb-4">{communityData.description}</p>
              
              {/* Member Avatars */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <div 
                      key={index}
                      className="w-8 h-8 bg-gray-800 rounded-full border-2 border-white flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">{communityData.memberCount}</span>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative ${
                      activeTab === tab
                        ? 'text-gray-900 border-b-2 border-purple-500'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <ChevronDown size={16} className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-purple-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {/* Community Tag */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Bell size={16} />
              <span>Football Community</span>
            </div>

            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg p-6">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">{post.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author}</h3>
                  </div>
                </div>

                {/* Post Content */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">{post.content}</p>
                  <p className="text-sm">
                    Link to book now: 
                    <span className="text-purple-600 ml-1 cursor-pointer hover:underline">
                      {post.bookingLink}
                    </span>
                  </p>
                </div>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-4">
                    {renderStadiumImage()}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-md transition-colors">
                    <ThumbsUp size={16} />
                    <span>{post.likes} Likes</span>
                  </button>
                  <button className="flex items-center gap-2 text-purple-600 hover:bg-purple-50 px-3 py-1 rounded-md transition-colors">
                    <MessageCircle size={16} />
                    <span>{post.comments} Comments</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4">
          {/* Events Section */}
          <div className="bg-white rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">Events</h3>
            <div className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">Oops, No events yet in your community.</p>
            </div>
          </div>

          {/* Ongoing AMAs Section */}
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Ongoing AMAs</h3>
            <div className="text-center py-8">
              <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">Oops, No ongoing AMAs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-600 transition-colors">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
          <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default CommunityPost;