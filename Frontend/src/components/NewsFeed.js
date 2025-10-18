
import React, { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useSnackbar } from '../hooks/useSnackbar';
import PostCard from './PostCard'; // This will be created next

const NewsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [privacy, setPrivacy] = useState('PU');
  const { showError, showSuccess } = useSnackbar();

  const fetchPosts = async () => {
    try {
      const response = await apiClient.get('/api/newsfeed/');
      setPosts(response.data);
    } catch (error) {
      showError('Failed to fetch posts.');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      showError('Post content cannot be empty.');
      return;
    }
    try {
      await apiClient.post('/api/newsfeed/', { content, privacy });
      showSuccess('Post created successfully!');
      setContent('');
      setPrivacy('PU');
      fetchPosts(); // Refresh posts after creation
    } catch (error) {
      showError(error.response?.data?.detail || 'Failed to create post.');
    }
  };

  return (
    <div>
      <h2>News Feed</h2>
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        />
        <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
          <option value="PU">Public</option>
          <option value="FO">Followers</option>
          <option value="PR">Private</option>
        </select>
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} refreshPosts={fetchPosts} />
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
