import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const handleCreate = async (event) => {
    event.preventDefault();

    createBlog({ title, author, url, likes });
  };

  return (
    <div className="formDiv">
      <h2>Create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          likes
          <input
            type="number"
            value={likes}
            name="Likes"
            id="likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button id="createBlog-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
