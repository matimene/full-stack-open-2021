import blogsService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.payload;
    case "NEW_BLOG":
      return [...state, action.payload];
    case "DELETE_BLOG":
      return state.filter((blog) => blog.id !== action.payload.id);
    case "LIKE_BLOG":
      const likeId = action.payload.id;
      return state.map((blog) => (blog.id === likeId ? action.payload : blog));
    case "ADD_COMMENT":
      const commentId = action.payload.id;
      return state.map((blog) =>
        blog.id === commentId ? action.payload : blog
      );
    case "SORT_BY_LIKES":
      return [...state].sort((a, b) => b.likes - a.likes);
    default:
      return state;
  }
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogsService.create(content);
    dispatch({
      type: "NEW_BLOG",
      payload: newBlog,
    });
  };
};

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blogToLike = await blogsService.getOne(id);
    const likedBlog = await blogsService.update(id, {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    });
    dispatch({
      type: "LIKE_BLOG",
      payload: likedBlog,
    });
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    const commentedBlog = await blogsService.comment(id, comment);
    dispatch({
      type: "ADD_COMMENT",
      payload: commentedBlog,
    });
    dispatch(
      setNotification(`Comment added to "${commentedBlog.title}"!`, false)
    );
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      payload: { id },
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      payload: blogs,
    });
  };
};

export const sortByLikes = () => {
  return { type: "SORT_BY_LIKES" };
};

export default noteReducer;
