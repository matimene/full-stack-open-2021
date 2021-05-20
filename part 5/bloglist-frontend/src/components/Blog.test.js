import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Myself Ofc",
    url: "www.testing.com",
    likes: 12,
  };
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} deleteBlog={() => null} likeBlog={mockHandler} />
    );
  });

  test("at start only the title and author are displayed", () => {
    expect(component.container).toHaveTextContent(
      "Component testing is done with react-testing-library"
    );
    expect(component.container).toHaveTextContent("Myself Ofc");
    expect(component.container).not.toHaveTextContent("www.testing.com");
    expect(component.container).not.toHaveTextContent(12);
  });

  test("after clicking the button, full info is displayed", () => {
    const button = component.getByText("show");
    fireEvent.click(button);

    expect(component.container).toHaveTextContent("www.testing.com");
    expect(component.container).toHaveTextContent(12);
  });

  test("if like button is clicked twice, event handler is called twice", () => {
    const expandButton = component.getByText("show");
    fireEvent.click(expandButton);
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
