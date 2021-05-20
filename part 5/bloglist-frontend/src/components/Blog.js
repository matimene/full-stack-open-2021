import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [fullInfo, setFullInfo] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return fullInfo ? (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}
        <button id="hide-button" onClick={() => setFullInfo(false)}>
          hide
        </button>
      </div>
      <div>Author: {blog.author}</div>
      <div>Url: {blog.url}</div>
      <div>
        Likes: {blog.likes}{" "}
        <button id="like-button" onClick={() => likeBlog(blog)}>
          like
        </button>
      </div>
      <div>{blog.user && blog.user.name}</div>
      <div>
        <button id="delete-button" onClick={() => deleteBlog(blog.id)}>
          delete
        </button>
      </div>
    </div>
  ) : (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button id="show-button" onClick={() => setFullInfo(true)}>
        show
      </button>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  }),
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
