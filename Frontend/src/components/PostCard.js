
import React from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../hooks/useSnackbar';

const PostCard = ({ post, refreshPosts }) => {
  const { user } = useAuth();
  const { showError, showSuccess } = useSnackbar();

  const isLiked = post.likes.some(like => like.owner === user.username);
  const likeId = isLiked ? post.likes.find(like => like.owner === user.username).id : null;

  const handleLikeToggle = async () => {
    try {
      if (isLiked) {
        await apiClient.delete(`/api/likes/${likeId}/`);
        showSuccess('Post unliked');
      } else {
        await apiClient.post('/api/likes/', { post: post.id });
        showSuccess('Post liked');
      }
      refreshPosts();
    } catch (error) {
      showError(error.response?.data?.detail || 'Action failed');
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/newsfeed/${post.id}/`);
      showSuccess('Post deleted');
      refreshPosts();
    } catch (error) {
      showError('Failed to delete post');
    }
  };

  // For now, edit is just a placeholder
  const handleEdit = () => {
    // A more complete implementation would open a modal or a form
    const newContent = prompt("Edit your post:", post.content);
    if (newContent && newContent !== post.content) {
      apiClient.put(`/api/newsfeed/${post.id}/`, { content: newContent, privacy: post.privacy })
        .then(() => {
          showSuccess('Post updated');
          refreshPosts();
        })
        .catch(() => showError('Failed to update post'));
    }
  };

  const canModify = user.role === 'MOD' || user.role === 'ADMIN' || post.author.id === user.id;

  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h4>{post.author.username}</h4>
      <p>{post.content}</p>
      <small>Privacy: {post.privacy}</small>
      <div>
        <span>Likes: {post.likes_count}</span>
        <span style={{ marginLeft: '10px' }}>Comments: {post.comments_count}</span>
      </div>
      <div>
        <button onClick={handleLikeToggle}>{isLiked ? 'Unlike' : 'Like'}</button>
        {canModify && (
          <>
            <button onClick={handleEdit} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px' }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostCard;
