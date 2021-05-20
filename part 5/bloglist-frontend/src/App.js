import React, { useState, useRef, useEffect } from "react";
import blogsService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState({
    message: null,
    isError: null,
  });
  const blogFormRef = useRef();

  useEffect(() => {
    blogsService.getAll().then((blogs) => setBlogs(blogs));

    const userLocalStorage = JSON.parse(localStorage.getItem("userLoggedInfo"));
    if (userLocalStorage) {
      setUser(userLocalStorage);
      blogsService.setToken(userLocalStorage.token);
    }
  }, []);

  const makeNotification = (message, isError) => {
    setNotificationMsg({ message, isError });
    setTimeout(() => {
      setNotificationMsg({ message: null, isError: null });
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("userLoggedInfo");
    makeNotification("User logged out", false);
  };

  const sortByLikes = () => {
    let sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  const likeBlog = async (blog) => {
    const likedBlog = await blogsService.update(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
    setBlogs(blogs.map((b) => (b.id === blog.id ? likedBlog : b)));
  };

  const createBlog = async ({ title, author, url, likes }) => {
    if (title && author && url) {
      try {
        const createdBlog = await blogsService.create({
          title,
          author,
          url,
          likes,
        });
        blogFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(createdBlog));
        makeNotification(`Blog "${title}" created!`, false);
      } catch (exception) {
        makeNotification(`Blog couldn't be created!: ${exception}`, true);
      }
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Do you really want to delete the blog?")) {
      try {
        await blogsService.deleteBlog(id);
        setBlogs(blogs.filter((b) => b.id !== id));
      } catch (err) {
        makeNotification(err.message, true);
      }
    }
  };

  if (!user) {
    return (
      <>
        <Notification
          msg={notificationMsg.message}
          isError={notificationMsg.isError}
        />
        <Login setUser={setUser} makeNotification={makeNotification} />
      </>
    );
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        msg={notificationMsg.message}
        isError={notificationMsg.isError}
      />
      <Togglable buttonLabel="New blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <h5>
        {user.name} logged in
        <button id="logout-button" onClick={() => handleLogout()}>
          logout
        </button>
      </h5>
      <button id="sort-button" onClick={() => sortByLikes()}>
        sort by likes
      </button>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
