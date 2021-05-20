import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
  const id = useParams().id;
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  if (!blog) {
    return null;
  }

  const like = () => {
    dispatch(likeBlog(blog.id));
    dispatch(setNotification(`"${blog.title}" liked!`, false));
  };

  const erase = () => {
    if (window.confirm("Do you really want to delete the blog?")) {
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(setNotification(`"${blog.title}" deleted!`, false));
      } catch (err) {
        setNotification(err.message, true);
      }
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog.id, comment));
  };

  const renderComments = () => {
    return (
      <div>
        <h3>Comments: </h3>
        <form onSubmit={addComment}>
          <input onChange={(e) => setComment(e.target.value)} />
          <button type="submit">add new comment</button>
        </form>
        {blog.comments.map((c, i) => (
          <div key={i}>-{c}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="blog">
      <h2>{blog.title}</h2>
      <div>Author: {blog.author}</div>
      <div>Url: {blog.url}</div>
      <div>
        Likes: {blog.likes}{" "}
        <button id="like-button" onClick={() => like()}>
          like
        </button>
      </div>
      <div>{blog.user && blog.user.name}</div>
      <div>
        <button id="delete-button" onClick={() => erase()}>
          delete
        </button>
      </div>
      {renderComments()}
    </div>
  );
};

export default Blog;
