import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

import Button from "@material-ui/core/Button";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [likes, setLikes] = useState(0);

  const handleCreate = async (event) => {
    event.preventDefault();

    try {
      dispatch(createBlog({ title, author, url, likes }));
      dispatch(setNotification(`Blog "${title}" created!`, false));
      setTitle("");
      setAuthor("");
      setUrl("");
      setLikes(0);
    } catch (err) {
      dispatch(setNotification(err, true));
    }
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
        <Button
          id="createBlog-button"
          type="submit"
          variant="contained"
          color="primary"
        >
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
