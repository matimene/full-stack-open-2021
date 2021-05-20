import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };

  const reset = (e) => {
    e.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} reset="false" />
        </div>
        <div>
          author
          <input {...author} reset="false" />
        </div>
        <div>
          url for more info
          <input {...info} reset="false" />
        </div>
        <button type="submit">create</button>
        <button onClick={(e) => reset(e)}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;
