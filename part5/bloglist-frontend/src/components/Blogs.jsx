import React from 'react';
import Blog from './Blog';

const Blogs = ({ blogs, onLike, onDelete, currentUser }) => {

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          onLike={onLike}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default Blogs;
