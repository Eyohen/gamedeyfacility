// pages/CreateCommunity.jsx
import React, { useState } from 'react';
import {
  ChevronLeft,
  Search,
  Upload,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';


const CreateCommunity = () => {
      const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    inviteGuests: '',
    privacy: 'open',
    coverImage: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrivacyChange = (privacy) => {
    setFormData(prev => ({
      ...prev,
      privacy
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          coverImage: file
        }));
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          coverImage: file
        }));
      }
    }
  };

  const handlePreview = () => {
    if (!formData.name.trim()) {
      setError('Community name is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Community description is required');
      return;
    }
    
    setError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Community data:', formData);
      setLoading(false);
      // Handle preview or navigation
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={()=>navigate(-1)} className="flex items-center gap-2 text-xl font-semibold hover:text-purple-600 transition-colors">
            <ChevronLeft size={28} />
            <span className="text-gray-600">Community</span>
          </button>
        </div>
        
    
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg p-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Community</h1>
          <p className="text-gray-600">Complete the form below to create your community.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}

        <div className="space-y-6">
          {/* Community Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name of Community
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name of community"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Community Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Cover Image
            </label>
            <div
              className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors ${
                dragActive 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.coverImage ? (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Upload className="text-green-600" size={24} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{formData.coverImage.name}</p>
                  <p className="text-xs text-gray-500">Image uploaded successfully</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-gray-400" size={24} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Upload Image</h3>
                  <p className="text-sm text-gray-500 mb-1">Upload your document (picture 10MB)</p>
                  <p className="text-sm text-gray-500 mb-4">Supports: JPG, PNG, MOV</p>
                  <p className="text-xs text-gray-400 mb-4">Maximum of 1 file</p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="cover-image-input"
                  />
                  <label
                    htmlFor="cover-image-input"
                    className="inline-block px-6 py-2 bg-white border-2 border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Community Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Community Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write your community description"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Invite Guests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Invite Guests
            </label>
            <input
              type="text"
              name="inviteGuests"
              value={formData.inviteGuests}
              onChange={handleChange}
              placeholder="Enter guests name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Privacy Settings */}
          <div>
            <div className="space-y-4">
              {/* Open Option */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Open</h3>
                  <p className="text-sm text-gray-600">Anyone can join and/or be invited to the community</p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handlePrivacyChange('open')}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.privacy === 'open'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {formData.privacy === 'open' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>

              {/* Restricted Option */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">Restricted</h3>
                  <p className="text-sm text-gray-600">
                    People must ask to join, and community manager must approve these requests
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => handlePrivacyChange('restricted')}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      formData.privacy === 'restricted'
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300 bg-white'
                    }`}
                  >
                    {formData.privacy === 'restricted' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Button */}
          <div className="pt-6">
            <button
              onClick={handlePreview}
              disabled={loading}
              className={`w-full py-4 bg-gray-400 text-white rounded-lg font-medium transition-colors ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-gray-500'
              }`}
            >
              {loading ? 'Creating Preview...' : 'Preview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCommunity;