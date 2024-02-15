import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete, currentUser }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    onLike(blog);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log('Blog user:', blog.user?.username);
  console.log('Current user:', currentUser?.username);

  return (
    <div style={blogStyle} className="blog">
      <div className="blogBasicInfo">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} className="viewButton">{visible ? 'hide' : 'view'}</button>
        {visible && (
          <div className="blogDetails">
            <p className="blogTitle">{blog.title}</p>
            <p className="blogUrl">{blog.url}</p>
            <p className="blogLikes">{blog.likes}
              <button className="likeButton" onClick={handleLike}>like</button>
            </p>
            <p className="blogAuthor">{blog.author}</p>
            {blog.user?.username === currentUser?.username && (
              <button onClick={handleDelete} className="deleteButton">delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    likes: PropTypes.number,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
