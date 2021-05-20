import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", () => {
  const createBlog = jest.fn();

  const component = render(<BlogForm createBlog={createBlog} />);

  const title = component.container.querySelector("#title");
  const author = component.container.querySelector("#author");
  const url = component.container.querySelector("#url");
  const likes = component.container.querySelector("#likes");
  const form = component.container.querySelector("form");

  fireEvent.change(title, {
    target: { value: "Testing of forms could be easier" },
  });
  fireEvent.change(author, {
    target: { value: "Who doesnt like to test" },
  });
  fireEvent.change(url, {
    target: { value: "www.saynototest.now" },
  });
  fireEvent.change(likes, {
    target: { value: 999999 },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Testing of forms could be easier",
    author: "Who doesnt like to test",
    url: "www.saynototest.now",
    likes: "999999",
  });
});
