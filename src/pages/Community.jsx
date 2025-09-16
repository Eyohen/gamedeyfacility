// //pages/Community.jsx 
// import React, { useState, useEffect } from 'react';
// import {
//   ThumbsUp,
//   MessageCircleMore,
//   BellRing,
//   Plus,
//   TrendingUp,
//   Filter,
//   Search,
//   Send,
//   Image as ImageIcon,
//   X,
//   Flag,
//   MoreHorizontal,
//   Share,
//   Clock,
//   Eye,
//   Building,
//   Users,
//   Star,
//   MapPin,
//   Calendar,
//   Zap
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';

// // Mobile Responsive Modal Component
// const CreatePostModal = ({ 
//   showCreatePost, 
//   setShowCreatePost, 
//   postTitle, 
//   setPostTitle,
//   postContent, 
//   setPostContent,
//   postType, 
//   setPostType,
//   postTags, 
//   setPostTags,
//   onCreatePost 
// }) => {
//   if (!showCreatePost) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-base sm:text-lg font-semibold">Share Facility Insights</h3>
//           <button onClick={() => setShowCreatePost(false)}>
//             <X size={20} className="text-gray-500" />
//           </button>
//         </div>
        
//         <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
//           <p className="text-xs sm:text-sm text-yellow-700">
//             📝 Your post will be reviewed by our moderators before appearing in the community.
//           </p>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//             <input
//               type="text"
//               value={postTitle}
//               onChange={(e) => setPostTitle(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
//               placeholder="Enter post title"
//               autoFocus
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
//             <textarea
//               value={postContent}
//               onChange={(e) => setPostContent(e.target.value)}
//               rows={5}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
//               placeholder="Share your facility management insights, ask questions, or discuss industry trends..."
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//             <select
//               value={postType}
//               onChange={(e) => setPostType(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
//             >
//               <option value="discussion">Discussion</option>
//               <option value="question">Question</option>
//               <option value="tip">Management Tip</option>
//               <option value="review">Facility Review</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
//             <input
//               type="text"
//               value={postTags}
//               onChange={(e) => setPostTags(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
//               placeholder="facility management, maintenance, customer service"
//             />
//           </div>
          
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={onCreatePost}
//               className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center text-sm sm:text-base"
//             >
//               <Send size={14} className="mr-2" />
//               Share Post
//             </button>
//             <button
//               onClick={() => setShowCreatePost(false)}
//               className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Community = () => {
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [activeButton, setActiveButton] = useState('home');
//   const [posts, setPosts] = useState([]);
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortBy, setSortBy] = useState('recent');
//   const [showCreatePost, setShowCreatePost] = useState(false);
//   const [showMobileFilters, setShowMobileFilters] = useState(false);

//   const [postTitle, setPostTitle] = useState('');
//   const [postContent, setPostContent] = useState('');
//   const [postType, setPostType] = useState('discussion');
//   const [postTags, setPostTags] = useState('');

//   // Facility-specific community categories
//   const facilityCommunities = [
//     {
//       id: 1,
//       title: 'Facility Management',
//       description: 'Best practices for managing sports facilities and maintaining quality.',
//       color: 'bg-blue-600',
//       image: '🏢',
//       count: '892 posts'
//     },
//     {
//       id: 2,
//       title: 'Equipment & Maintenance',
//       description: 'Discuss equipment needs, maintenance tips, and facility upgrades.',
//       color: 'bg-green-600',
//       image: '🔧',
//       count: '654 posts'
//     },
//     {
//       id: 3,
//       title: 'Business Operations',
//       description: 'Share insights on running a successful sports facility business.',
//       color: 'bg-purple-600',
//       image: '💼',
//       count: '723 posts'
//     },
//     {
//       id: 4,
//       title: 'Customer Experience',
//       description: 'Tips for improving customer satisfaction and retention.',
//       color: 'bg-orange-600',
//       image: '⭐',
//       count: '456 posts'
//     },
//     {
//       id: 5,
//       title: 'Safety & Compliance',
//       description: 'Discuss safety protocols and regulatory compliance.',
//       color: 'bg-red-600',
//       image: '🛡️',
//       count: '321 posts'
//     },
//     {
//       id: 6,
//       title: 'Technology & Innovation',
//       description: 'Latest tech solutions for modern sports facilities.',
//       color: 'bg-cyan-600',
//       image: '📱',
//       count: '287 posts'
//     }
//   ];

//   // Facility-specific categories for home view
//   const facilityCategories = [
//     { name: 'Football Facilities', color: 'bg-blue-500', icon: '⚽' },
//     { name: 'Tennis Courts', color: 'bg-green-500', icon: '🎾' },
//     { name: 'Basketball Courts', color: 'bg-orange-500', icon: '🏀' },
//     { name: 'Swimming Pools', color: 'bg-cyan-500', icon: '🏊‍♂️' },
//     { name: 'Fitness Centers', color: 'bg-purple-500', icon: '💪' },
//     { name: 'Multi-Sport Venues', color: 'bg-red-500', icon: '🏟️' }
//   ];

//   // Fetch posts from API
//   const fetchPosts = async () => {
//     try {
//       setLoading(true);
//       setError('');
      
//       const params = {
//         sortBy,
//         limit: 20
//       };
      
//       if (searchTerm) {
//         params.search = searchTerm;
//       }

//       const response = await axios.get(`${URL}/api/community/posts`, { params });
      
//       if (response.data.success) {
//         setPosts(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching posts:', err);
//       setError(err.response?.data?.message || 'Failed to fetch posts');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch trending posts
//   const fetchTrendingPosts = async () => {
//     try {
//       const response = await axios.get(`${URL}/api/community/posts/trending`, {
//         params: { limit: 5 }
//       });
      
//       if (response.data.success) {
//         setTrendingPosts(response.data.data);
//       }
//     } catch (err) {
//       console.error('Error fetching trending posts:', err);
//     }
//   };

//   // Create post function
//   const createPost = async () => {
//     try {
//       if (!user) {
//         setError('Please login to create a post');
//         return;
//       }

//       if (!postTitle.trim() || !postContent.trim()) {
//         setError('Title and content are required');
//         return;
//       }

//       const token = localStorage.getItem('access_token');
//       const postData = {
//         title: postTitle,
//         content: postContent,
//         type: postType,
//         tags: postTags ? postTags.split(',').map(tag => tag.trim()) : []
//       };

//       const response = await axios.post(`${URL}/api/community/posts`, postData, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.data.success) {
//         setPostTitle('');
//         setPostContent('');
//         setPostType('discussion');
//         setPostTags('');
//         setShowCreatePost(false);
        
//         alert('Post created successfully! It will be visible after admin approval.');
//         fetchPosts();
//       }
//     } catch (err) {
//       console.error('Error creating post:', err);
//       setError(err.response?.data?.message || 'Failed to create post');
//     }
//   };

//   // Vote on a post
//   const voteOnPost = async (postId, voteType) => {
//     try {
//       if (!user) {
//         setError('Please login to vote');
//         return;
//       }

//       const token = localStorage.getItem('access_token');
//       const response = await axios.post(`${URL}/api/community/posts/${postId}/vote`, 
//         { type: voteType },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setPosts(prevPosts => 
//           prevPosts.map(post => {
//             if (post.id === postId) {
//               const updatedPost = { ...post };
//               if (voteType === 'upvote') {
//                 updatedPost.upvotes = (updatedPost.upvotes || 0) + (response.data.data.removed ? -1 : 1);
//               } else {
//                 updatedPost.downvotes = (updatedPost.downvotes || 0) + (response.data.data.removed ? -1 : 1);
//               }
//               return updatedPost;
//             }
//             return post;
//           })
//         );
//       }
//     } catch (err) {
//       console.error('Error voting on post:', err);
//       setError(err.response?.data?.message || 'Failed to vote on post');
//     }
//   };

//   // Share a post
//   const sharePost = async (postId, platform = 'general') => {
//     try {
//       if (!user) {
//         setError('Please login to share posts');
//         return;
//       }

//       const token = localStorage.getItem('access_token');
//       const response = await axios.post(`${URL}/api/community/posts/${postId}/share`, 
//         { platform },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         setPosts(prevPosts => 
//           prevPosts.map(post => {
//             if (post.id === postId) {
//               return { ...post, shareCount: (post.shareCount || 0) + 1 };
//             }
//             return post;
//           })
//         );
//         alert('Post shared successfully!');
//       }
//     } catch (err) {
//       console.error('Error sharing post:', err);
//       setError(err.response?.data?.message || 'Failed to share post');
//     }
//   };

//   // Flag a post
//   const flagPost = async (postId, reason) => {
//     try {
//       if (!user) {
//         setError('Please login to flag posts');
//         return;
//       }

//       const token = localStorage.getItem('access_token');
//       const response = await axios.post(`${URL}/api/community/posts/${postId}/flag`, 
//         { reason },
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );

//       if (response.data.success) {
//         alert('Post has been flagged for review');
//       }
//     } catch (err) {
//       console.error('Error flagging post:', err);
//       setError(err.response?.data?.message || 'Failed to flag post');
//     }
//   };

//   // Format time ago
//   const formatTimeAgo = (dateString) => {
//     const now = new Date();
//     const date = new Date(dateString);
//     const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
//     return date.toLocaleDateString();
//   };

//   useEffect(() => {
//     if (activeButton === 'home') {
//       fetchPosts();
//       fetchTrendingPosts();
//     }
//   }, [activeButton, sortBy, searchTerm]);

//   // Debounced search
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (activeButton === 'home') {
//         fetchPosts();
//       }
//     }, 500);

//     return () => clearTimeout(timeoutId);
//   }, [searchTerm]);

//   const handleCommunityClick = (community) => {
//     navigate('/community-post', { state: { community } });
//   };

//   // Mobile Responsive Explore View
//   const renderExploreView = () => {
//     return (
//       <div className="px-4 py-4 sm:py-8">
//         {/* Mobile responsive header */}
//         <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
//           <div className='bg-gray-100 w-full sm:w-[200px] p-2 rounded-lg'>
//             <div className='flex gap-x-2'>
//               <button
//                 className={`flex-1 sm:flex-none px-4 sm:px-5 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'home'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('home')}
//               >
//                 Home
//               </button>
//               <button
//                 className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'explore'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('explore')}
//               >
//                 Explore
//               </button>
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
//             <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
//               <Filter size={16} />
//               Filter
//             </button>
//             <button 
//               onClick={() => navigate('/create-community')} 
//               className='bg-[#946BEF] rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors text-sm sm:text-base'
//             >
//               <span className="hidden sm:inline">Create Community</span>
//               <span className="sm:hidden">Create</span>
//             </button>
//           </div>
//         </div>

//         {/* Mobile responsive grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//           {facilityCommunities.map((community) => (
//             <div 
//               key={community.id}
//               onClick={() => handleCommunityClick(community)}
//               className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
//             >
//               <div className={`h-24 sm:h-32 ${community.color} relative flex items-center justify-center`}>
//                 <div className="text-2xl sm:text-4xl">
//                   {community.image}
//                 </div>
//                 <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
//               </div>
              
//               <div className="p-3 sm:p-4">
//                 <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
//                   {community.title}
//                 </h3>
//                 <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
//                   {community.description}
//                 </p>
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500">{community.count}</span>
//                   <div className="flex items-center gap-1 text-xs text-gray-500">
//                     <Users size={12} />
//                     <span>Active</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   // Mobile Responsive Home View
//   const renderHomeView = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#7042D2]"></div>
//         </div>
//       );
//     }

//     return (
//       <div className="px-4 py-4 sm:py-8">
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
//             <span className="text-xs sm:text-sm text-red-700 break-words">{error}</span>
//             <button 
//               onClick={() => setError('')}
//               className="ml-2 text-red-500 hover:text-red-700"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Mobile responsive header */}
//         <div className='flex flex-col space-y-4 mb-6'>
//           {/* Tab navigation */}
//           <div className='bg-gray-100 w-full sm:w-[200px] p-2 rounded-lg'>
//             <div className='flex gap-x-2'>
//               <button
//                 className={`flex-1 sm:flex-none px-4 sm:px-5 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'home'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('home')}
//               >
//                 Home
//               </button>
//               <button
//                 className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'explore'
//                     ? 'bg-white text-black'
//                     : 'bg-transparent text-gray-600 hover:bg-gray-200'
//                   }`}
//                 onClick={() => setActiveButton('explore')}
//               >
//                 Explore
//               </button>
//             </div>
//           </div>

//           {/* Search and controls */}
//           <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
//             {/* Search - full width on mobile */}
//             <div className="relative flex-1 sm:flex-none sm:w-64">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search posts..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm sm:text-base"
//               />
//             </div>

//             {/* Mobile filter toggle */}
//             <button
//               onClick={() => setShowMobileFilters(!showMobileFilters)}
//               className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors sm:hidden"
//             >
//               <Filter size={16} />
//               Filters
//             </button>

//             {/* Desktop filters */}
//             <div className="hidden sm:flex gap-2">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               >
//                 <option value="recent">Recent</option>
//                 <option value="popular">Popular</option>
//                 <option value="comments">Most Comments</option>
//               </select>
//             </div>

//             {/* Create post button */}
//             <button 
//               onClick={() => setShowCreatePost(true)}
//               className='bg-[#946BEF] border-2 border-black rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base flex-shrink-0'
//             >
//               <Plus size={16} />
//               <span className="hidden sm:inline">Create Post</span>
//               <span className="sm:hidden">Create</span>
//             </button>
//           </div>

//           {/* Mobile filters panel */}
//           {showMobileFilters && (
//             <div className="sm:hidden bg-white border border-gray-200 rounded-lg p-4">
//               <select
//                 value={sortBy}
//                 onChange={(e) => {
//                   setSortBy(e.target.value);
//                   setShowMobileFilters(false);
//                 }}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
//               >
//                 <option value="recent">Recent</option>
//                 <option value="popular">Popular</option>
//                 <option value="comments">Most Comments</option>
//               </select>
//             </div>
//           )}
//         </div>

//         {/* Mobile responsive categories */}
//         <div className='flex gap-3 sm:gap-6 py-4 sm:py-6 h-[140px] sm:h-[170px] mb-6 sm:mb-8 overflow-x-auto'>
//           {facilityCategories.map((category, index) => (
//             <div key={index} className='border border-black rounded-md cursor-pointer hover:shadow-lg transition-shadow min-w-[140px] sm:min-w-[200px] flex-shrink-0'>
//               <div className={`w-full h-16 sm:h-24 ${category.color} rounded-t-md flex items-center justify-center text-xl sm:text-2xl`}>
//                 {category.icon}
//               </div>
//               <div className='px-2 py-2'>
//                 <p className='font-semibold text-xs sm:text-sm text-center'>{category.name}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Trending button */}
//         {trendingPosts.length > 0 && (
//           <button className='border-2 border-black rounded-xl sm:rounded-2xl px-3 py-1 mt-4 mb-6 hover:bg-gray-50 transition-colors text-sm sm:text-base'>
//             <TrendingUp size={14} className="sm:w-4 sm:h-4 inline mr-1" />
//             <span className="hidden sm:inline">Trending in Facility Management</span>
//             <span className="sm:hidden">Trending</span>
//           </button>
//         )}

//         {/* Mobile responsive posts */}
//         <div className="space-y-4 sm:space-y-6">
//           {posts.length > 0 ? (
//             posts.map((post) => (
//               <div key={post.id} className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
//                 {/* Post header - mobile responsive */}
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
//                   <div className="flex items-center">
//                     <Building size={14} className="sm:w-4 sm:h-4 text-gray-400 mr-2" />
//                     <span className="text-gray-400 text-xs sm:text-sm">
//                       {post.Sport?.name || 'Facility Management'} Community
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 self-start">
//                     <button 
//                       onClick={() => flagPost(post.id, 'inappropriate')}
//                       className="text-gray-400 hover:text-red-500 transition-colors"
//                       title="Flag post"
//                     >
//                       <Flag size={14} className="sm:w-4 sm:h-4" />
//                     </button>
//                     <button className="text-gray-400 hover:text-gray-600 transition-colors">
//                       <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* User info - mobile responsive */}
//                 <div className='flex gap-x-2 sm:gap-x-3 py-2 items-center'>
//                   <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
//                     <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
//                       {post.User ? post.User.firstName.charAt(0) : 'F'}
//                     </div>
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className='text-gray-600 font-medium text-sm sm:text-base truncate'>
//                       {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Facility Manager'}
//                     </p>
//                     <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
//                       <span className="flex items-center gap-1">
//                         <Clock size={10} className="sm:w-3 sm:h-3" />
//                         {formatTimeAgo(post.createdAt)}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Eye size={10} className="sm:w-3 sm:h-3" />
//                         {post.viewCount || 0} views
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Post content - mobile responsive */}
//                 <div className="mb-4">
//                   <h3 className="font-semibold text-base sm:text-lg mb-2">{post.title}</h3>
//                   <p className="text-gray-700 mb-2 text-sm sm:text-base line-clamp-3 sm:line-clamp-none">{post.content}</p>
                  
//                   {post.tags && post.tags.length > 0 && (
//                     <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
//                       {post.tags.slice(0, 3).map((tag, index) => (
//                         <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
//                           #{tag}
//                         </span>
//                       ))}
//                       {post.tags.length > 3 && (
//                         <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Post image - mobile responsive */}
//                 {post.images && post.images.length > 0 && (
//                   <div className="mb-4">
//                     <div className="w-full max-w-full sm:max-w-md h-32 sm:h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
//                       <span className="text-white text-sm sm:text-lg font-semibold">Facility Image</span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Actions - mobile responsive */}
//                 <div className='text-[#946BEF] flex flex-wrap gap-2 sm:gap-6 py-2 border-t pt-4'>
//                   <button 
//                     className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
//                     onClick={() => voteOnPost(post.id, 'upvote')}
//                   >
//                     <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">{post.upvotes || 0} Helpful</span>
//                     <span className="sm:hidden">{post.upvotes || 0}</span>
//                   </button>
//                   <button 
//                     className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
//                     onClick={() => navigate(`/post/${post.id}`)}
//                   >
//                     <MessageCircleMore size={14} className="sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">{post.commentCount || 0} Comments</span>
//                     <span className="sm:hidden">{post.commentCount || 0}</span>
//                   </button>
//                   <button 
//                     className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
//                     onClick={() => sharePost(post.id)}
//                   >
//                     <Share size={14} className="sm:w-4 sm:h-4" />
//                     <span className="hidden sm:inline">{post.shareCount || 0} Share</span>
//                     <span className="sm:hidden">{post.shareCount || 0}</span>
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-8 sm:py-12 px-4">
//               <Building size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
//               <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
//               <p className="text-gray-500 mb-4 text-sm sm:text-base">
//                 Be the first to share facility management insights with the community!
//               </p>
//               <button 
//                 onClick={() => setShowCreatePost(true)}
//                 className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors text-sm sm:text-base"
//               >
//                 <Plus size={14} className="sm:w-4 sm:h-4 inline mr-2" />
//                 Create Post
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div>
//       {activeButton === 'explore' ? renderExploreView() : renderHomeView()}
      
//       <CreatePostModal
//         showCreatePost={showCreatePost}
//         setShowCreatePost={setShowCreatePost}
//         postTitle={postTitle}
//         setPostTitle={setPostTitle}
//         postContent={postContent}
//         setPostContent={setPostContent}
//         postType={postType}
//         setPostType={setPostType}
//         postTags={postTags}
//         setPostTags={setPostTags}
//         onCreatePost={createPost}
//       />
//     </div>
//   );
// };

// export default Community;






//pages/Community.jsx - FIXED Facility Community with Working Posts and Comments
import React, { useState, useEffect } from 'react';
import {
  ThumbsUp,
  MessageCircleMore,
  BellRing,
  Plus,
  TrendingUp,
  Filter,
  Search,
  Send,
  Image as ImageIcon,
  X,
  Flag,
  MoreHorizontal,
  Share,
  Clock,
  Eye,
  Building,
  Users,
  Star,
  MapPin,
  Calendar,
  Zap,
  MessageCircle,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Mobile Responsive Create Post Modal Component
const CreatePostModal = ({ 
  showCreatePost, 
  setShowCreatePost, 
  postTitle, 
  setPostTitle,
  postContent, 
  setPostContent,
  postType, 
  setPostType,
  postTags, 
  setPostTags,
  onCreatePost 
}) => {
  if (!showCreatePost) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Share Facility Insights</h3>
          <button onClick={() => setShowCreatePost(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
          <p className="text-xs sm:text-sm text-yellow-700">
            📝 Your post will be reviewed by our moderators before appearing in the community.
          </p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              placeholder="Enter post title"
              autoFocus
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base resize-none"
              placeholder="Share your facility management insights, ask questions, or discuss industry trends..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
            >
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="tip">Management Tip</option>
              <option value="review">Facility Review</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={postTags}
              onChange={(e) => setPostTags(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm sm:text-base"
              placeholder="facility management, maintenance, customer service"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onCreatePost}
              className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              <Send size={14} className="mr-2" />
              Share Post
            </button>
            <button
              onClick={() => setShowCreatePost(false)}
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comment Modal Component - Mobile Responsive
const CommentModal = ({
  showComments,
  setShowComments,
  post,
  commentText,
  setCommentText,
  onAddComment,
  comments = []
}) => {
  if (!showComments) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h3 className="text-lg font-semibold">Comments</h3>
          <button onClick={() => setShowComments(false)}>
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Post Summary */}
        <div className="p-4 border-b bg-gray-50 flex-shrink-0">
          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-1">{post?.title}</h4>
          <p className="text-xs text-gray-600 line-clamp-2">{post?.content}</p>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="mb-4 pb-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xs font-bold">
                      {comment.User?.firstName?.charAt(0) || 'F'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {comment.User?.firstName} {comment.User?.lastName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Add Comment Form */}
        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2 mb-3">
            <p className="text-xs text-yellow-700">
              💭 Your comment will be reviewed before appearing.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-xs font-bold">You</span>
            </div>
            <div className="flex-1 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && onAddComment()}
              />
              <button
                onClick={onAddComment}
                disabled={!commentText.trim()}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('home');
  const [posts, setPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('discussion');
  const [postTags, setPostTags] = useState('');

  // Comment state
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState([]);

  // Facility-specific community categories
  const facilityCommunities = [
    {
      id: 1,
      title: 'Facility Management',
      description: 'Best practices for managing sports facilities and maintaining quality.',
      color: 'bg-blue-600',
      image: '🏢',
      count: '892 posts'
    },
    {
      id: 2,
      title: 'Equipment & Maintenance',
      description: 'Discuss equipment needs, maintenance tips, and facility upgrades.',
      color: 'bg-green-600',
      image: '🔧',
      count: '654 posts'
    },
    {
      id: 3,
      title: 'Business Operations',
      description: 'Share insights on running a successful sports facility business.',
      color: 'bg-purple-600',
      image: '💼',
      count: '723 posts'
    },
    {
      id: 4,
      title: 'Customer Experience',
      description: 'Tips for improving customer satisfaction and retention.',
      color: 'bg-orange-600',
      image: '⭐',
      count: '456 posts'
    },
    {
      id: 5,
      title: 'Safety & Compliance',
      description: 'Discuss safety protocols and regulatory compliance.',
      color: 'bg-red-600',
      image: '🛡️',
      count: '321 posts'
    },
    {
      id: 6,
      title: 'Technology & Innovation',
      description: 'Latest tech solutions for modern sports facilities.',
      color: 'bg-cyan-600',
      image: '📱',
      count: '287 posts'
    }
  ];

  // Facility-specific categories for home view
  const facilityCategories = [
    { name: 'Football Facilities', color: 'bg-blue-500', icon: '⚽' },
    { name: 'Tennis Courts', color: 'bg-green-500', icon: '🎾' },
    { name: 'Basketball Courts', color: 'bg-orange-500', icon: '🏀' },
    { name: 'Swimming Pools', color: 'bg-cyan-500', icon: '🏊‍♂️' },
    { name: 'Fitness Centers', color: 'bg-purple-500', icon: '💪' },
    { name: 'Multi-Sport Venues', color: 'bg-red-500', icon: '🏟️' }
  ];

  // Fetch posts from API - FIXED endpoint
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = {
        sortBy,
        limit: 20
      };
      
      if (searchTerm) {
        params.search = searchTerm;
      }

      // FIXED: Use correct endpoint
      const response = await axios.get(`${URL}/api/community/posts`, { params });
      
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError(err.response?.data?.message || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  // Fetch trending posts - FIXED endpoint
  const fetchTrendingPosts = async () => {
    try {
      const response = await axios.get(`${URL}/api/community/posts/trending`, {
        params: { limit: 5 }
      });
      
      if (response.data.success) {
        setTrendingPosts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching trending posts:', err);
    }
  };

  // Fetch comments for a post
  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`${URL}/api/community/posts/${postId}`);
      if (response.data.success) {
        setPostComments(response.data.data.Comments || []);
      }
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  // Open comments modal
  const openComments = async (post) => {
    setSelectedPost(post);
    setShowComments(true);
    await fetchComments(post.id);
  };

  // Create post function - FIXED endpoint
  const createPost = async () => {
    try {
      if (!user) {
        setError('Please login to create a post');
        return;
      }

      if (!postTitle.trim() || !postContent.trim()) {
        setError('Title and content are required');
        return;
      }

      const token = localStorage.getItem('access_token');
      const postData = {
        title: postTitle,
        content: postContent,
        type: postType,
        tags: postTags ? postTags.split(',').map(tag => tag.trim()) : []
      };

      // FIXED: Use correct endpoint
      const response = await axios.post(`${URL}/api/community/posts`, postData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setPostTitle('');
        setPostContent('');
        setPostType('discussion');
        setPostTags('');
        setShowCreatePost(false);
        
        alert('Post created successfully! It will be visible after admin approval.');
        fetchPosts();
      }
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  // Add comment - FIXED
  const addComment = async () => {
    try {
      if (!commentText.trim()) return;

      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Please login to comment');
        return;
      }

      const response = await axios.post(
        `${URL}/api/community/posts/${selectedPost.id}/comments`,
        { content: commentText },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCommentText('');
        alert('Comment added! It will be visible after admin approval.');
        await fetchComments(selectedPost.id);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      alert(err.response?.data?.message || 'Failed to add comment');
    }
  };

  // Vote on a post - FIXED endpoint
  const voteOnPost = async (postId, voteType) => {
    try {
      if (!user) {
        setError('Please login to vote');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/api/community/posts/${postId}/vote`, 
        { type: voteType },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPosts(prevPosts => 
          prevPosts.map(post => {
            if (post.id === postId) {
              const updatedPost = { ...post };
              if (voteType === 'upvote') {
                updatedPost.upvotes = (updatedPost.upvotes || 0) + (response.data.data.removed ? -1 : 1);
              } else {
                updatedPost.downvotes = (updatedPost.downvotes || 0) + (response.data.data.removed ? -1 : 1);
              }
              return updatedPost;
            }
            return post;
          })
        );
      }
    } catch (err) {
      console.error('Error voting on post:', err);
      setError(err.response?.data?.message || 'Failed to vote on post');
    }
  };

  // Share a post - FIXED endpoint
  const sharePost = async (postId, platform = 'general') => {
    try {
      if (!user) {
        setError('Please login to share posts');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/api/community/posts/${postId}/share`, 
        { platform },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        setPosts(prevPosts => 
          prevPosts.map(post => {
            if (post.id === postId) {
              return { ...post, shareCount: (post.shareCount || 0) + 1 };
            }
            return post;
          })
        );
        alert('Post shared successfully!');
      }
    } catch (err) {
      console.error('Error sharing post:', err);
      setError(err.response?.data?.message || 'Failed to share post');
    }
  };

  // Flag a post - FIXED endpoint
  const flagPost = async (postId, reason) => {
    try {
      if (!user) {
        setError('Please login to flag posts');
        return;
      }

      const token = localStorage.getItem('access_token');
      const response = await axios.post(`${URL}/api/community/posts/${postId}/flag`, 
        { reason },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (response.data.success) {
        alert('Post has been flagged for review');
      }
    } catch (err) {
      console.error('Error flagging post:', err);
      setError(err.response?.data?.message || 'Failed to flag post');
    }
  };

  // Delete post - FIXED endpoint
  const deletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.delete(`${URL}/api/community/posts/${postId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data.success) {
        setPosts(prev => prev.filter(post => post.id !== postId));
        alert('Post deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
      alert(err.response?.data?.message || 'Failed to delete post');
    }
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  useEffect(() => {
    if (activeButton === 'home') {
      fetchPosts();
      fetchTrendingPosts();
    }
  }, [activeButton, sortBy, searchTerm]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (activeButton === 'home') {
        fetchPosts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleCommunityClick = (community) => {
    navigate('/community-post', { state: { community } });
  };

  // Mobile Responsive Explore View
  const renderExploreView = () => {
    return (
      <div className="px-4 py-4 sm:py-8">
        {/* Mobile responsive header */}
        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
          <div className='bg-gray-100 w-full sm:w-[200px] p-2 rounded-lg'>
            <div className='flex gap-x-2'>
              <button
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'home'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('home')}
              >
                Home
              </button>
              <button
                className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'explore'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('explore')}
              >
                Explore
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
              <Filter size={16} />
              Filter
            </button>
            <button 
              onClick={() => navigate('/create-community')} 
              className='bg-[#946BEF] rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors text-sm sm:text-base'
            >
              <span className="hidden sm:inline">Create Community</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>
        </div>

        {/* Mobile responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {facilityCommunities.map((community) => (
            <div 
              key={community.id}
              onClick={() => handleCommunityClick(community)}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className={`h-24 sm:h-32 ${community.color} relative flex items-center justify-center`}>
                <div className="text-2xl sm:text-4xl">
                  {community.image}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
              </div>
              
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 mb-2">
                  {community.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
                  {community.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{community.count}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users size={12} />
                    <span>Active</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Mobile Responsive Home View
  const renderHomeView = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-[#7042D2]"></div>
        </div>
      );
    }

    return (
      <div className="px-4 py-4 sm:py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
            <span className="text-xs sm:text-sm text-red-700 break-words">{error}</span>
            <button 
              onClick={() => setError('')}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Mobile responsive header */}
        <div className='flex flex-col space-y-4 mb-6'>
          {/* Tab navigation */}
          <div className='bg-gray-100 w-full sm:w-[200px] p-2 rounded-lg'>
            <div className='flex gap-x-2'>
              <button
                className={`flex-1 sm:flex-none px-4 sm:px-5 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'home'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('home')}
              >
                Home
              </button>
              <button
                className={`flex-1 sm:flex-none px-4 py-1 rounded-lg transition-colors text-sm sm:text-base ${activeButton === 'explore'
                    ? 'bg-white text-black'
                    : 'bg-transparent text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => setActiveButton('explore')}
              >
                Explore
              </button>
            </div>
          </div>

          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Search - full width on mobile */}
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-sm sm:text-base"
              />
            </div>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors sm:hidden"
            >
              <Filter size={16} />
              Filters
            </button>

            {/* Desktop filters */}
            <div className="hidden sm:flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="comments">Most Comments</option>
              </select>
            </div>

            {/* Create post button */}
            <button 
              onClick={() => setShowCreatePost(true)}
              className='bg-[#946BEF] border-2 border-black rounded-lg text-white px-4 py-2 hover:bg-[#7c3aed] transition-colors flex items-center justify-center gap-2 text-sm sm:text-base flex-shrink-0'
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Create Post</span>
              <span className="sm:hidden">Create</span>
            </button>
          </div>

          {/* Mobile filters panel */}
          {showMobileFilters && (
            <div className="sm:hidden bg-white border border-gray-200 rounded-lg p-4">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setShowMobileFilters(false);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="recent">Recent</option>
                <option value="popular">Popular</option>
                <option value="comments">Most Comments</option>
              </select>
            </div>
          )}
        </div>

        {/* Mobile responsive categories */}
        <div className='flex gap-3 sm:gap-6 py-4 sm:py-6 h-[140px] sm:h-[170px] mb-6 sm:mb-8 overflow-x-auto'>
          {facilityCategories.map((category, index) => (
            <div key={index} className='border border-black rounded-md cursor-pointer hover:shadow-lg transition-shadow min-w-[140px] sm:min-w-[200px] flex-shrink-0'>
              <div className={`w-full h-16 sm:h-24 ${category.color} rounded-t-md flex items-center justify-center text-xl sm:text-2xl`}>
                {category.icon}
              </div>
              <div className='px-2 py-2'>
                <p className='font-semibold text-xs sm:text-sm text-center'>{category.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trending button */}
        {trendingPosts.length > 0 && (
          <button className='border-2 border-black rounded-xl sm:rounded-2xl px-3 py-1 mt-4 mb-6 hover:bg-gray-50 transition-colors text-sm sm:text-base'>
            <TrendingUp size={14} className="sm:w-4 sm:h-4 inline mr-1" />
            <span className="hidden sm:inline">Trending in Facility Management</span>
            <span className="sm:hidden">Trending</span>
          </button>
        )}

        {/* Mobile responsive posts */}
        <div className="space-y-4 sm:space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                {/* Post header - mobile responsive */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Building size={14} className="sm:w-4 sm:h-4 text-gray-400 mr-2" />
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {post.Sport?.name || 'Facility Management'} Community
                    </span>
                  </div>
                  <div className="flex items-center gap-2 self-start">
                    <button 
                      onClick={() => flagPost(post.id, 'inappropriate')}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title="Flag post"
                    >
                      <Flag size={14} className="sm:w-4 sm:h-4" />
                    </button>
                    {post.User?.id === user?.id && (
                      <button 
                        onClick={() => deletePost(post.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </button>
                    )}
                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

                {/* User info - mobile responsive */}
                <div className='flex gap-x-2 sm:gap-x-3 py-2 items-center'>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                      {post.User ? post.User.firstName.charAt(0) : 'F'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className='text-gray-600 font-medium text-sm sm:text-base truncate'>
                      {post.User ? `${post.User.firstName} ${post.User.lastName}` : 'Facility Manager'}
                    </p>
                    <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock size={10} className="sm:w-3 sm:h-3" />
                        {formatTimeAgo(post.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={10} className="sm:w-3 sm:h-3" />
                        {post.viewCount || 0} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Post content - mobile responsive */}
                <div className="mb-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-2 text-sm sm:text-base line-clamp-3 sm:line-clamp-none">{post.content}</p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Post image - mobile responsive */}
                {post.images && post.images.length > 0 && (
                  <div className="mb-4">
                    <div className="w-full max-w-full sm:max-w-md h-32 sm:h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-sm sm:text-lg font-semibold">Facility Image</span>
                    </div>
                  </div>
                )}

                {/* Actions - mobile responsive */}
                <div className='text-[#946BEF] flex flex-wrap gap-2 sm:gap-6 py-2 border-t pt-4'>
                  <button 
                    className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
                    onClick={() => voteOnPost(post.id, 'upvote')}
                  >
                    <ThumbsUp size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{post.upvotes || 0} Helpful</span>
                    <span className="sm:hidden">{post.upvotes || 0}</span>
                  </button>
                  <button 
                    className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
                    onClick={() => openComments(post)}
                  >
                    <MessageCircleMore size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{post.commentCount || 0} Comments</span>
                    <span className="sm:hidden">{post.commentCount || 0}</span>
                  </button>
                  <button 
                    className='flex items-center gap-x-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors text-xs sm:text-sm'
                    onClick={() => sharePost(post.id)}
                  >
                    <Share size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">{post.shareCount || 0} Share</span>
                    <span className="sm:hidden">{post.shareCount || 0}</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12 px-4">
              <Building size={40} className="sm:w-12 sm:h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4 text-sm sm:text-base">
                Be the first to share facility management insights with the community!
              </p>
              <button 
                onClick={() => setShowCreatePost(true)}
                className="bg-[#7042D2] text-white px-6 py-2 rounded-lg hover:bg-[#5c35a8] transition-colors text-sm sm:text-base"
              >
                <Plus size={14} className="sm:w-4 sm:h-4 inline mr-2" />
                Create Post
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {activeButton === 'explore' ? renderExploreView() : renderHomeView()}
      
      <CreatePostModal
        showCreatePost={showCreatePost}
        setShowCreatePost={setShowCreatePost}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postContent={postContent}
        setPostContent={setPostContent}
        postType={postType}
        setPostType={setPostType}
        postTags={postTags}
        setPostTags={setPostTags}
        onCreatePost={createPost}
      />
      
      <CommentModal
        showComments={showComments}
        setShowComments={setShowComments}
        post={selectedPost}
        commentText={commentText}
        setCommentText={setCommentText}
        onAddComment={addComment}
        comments={postComments}
      />
    </div>
  );
};

export default Community;