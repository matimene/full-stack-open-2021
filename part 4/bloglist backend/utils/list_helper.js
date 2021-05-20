const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (!blogs) {
    return 0;
  }
  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  return blogs.reduce((prev, curr) => prev + curr.likes, 0);
};

const favourite = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favouriteBlog = { likes: 0 };
  blogs.map((blog) => {
    return blog.likes >= favouriteBlog.likes && (favouriteBlog = blog);
  });

  return favouriteBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let authorsBlogs = {};

  blogs.map((blog) => {
    let { author } = blog;
    if (authorsBlogs[author]) {
      return (authorsBlogs[author] += 1);
    } else {
      return (authorsBlogs[author] = 1);
    }
  });

  let maxAuthor = _.max(
    Object.keys(authorsBlogs),
    (blogsNum) => authorsBlogs[blogsNum]
  );

  return { author: maxAuthor, blogs: authorsBlogs[maxAuthor] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let authorsLikes = {};

  blogs.map((blog) => {
    let { author, likes } = blog;
    if (authorsLikes[author]) {
      return (authorsLikes[author] += likes);
    } else {
      return (authorsLikes[author] = likes);
    }
  });

  let maxAuthor = _.max(
    Object.keys(authorsLikes),
    (blogsNum) => authorsLikes[blogsNum]
  );

  return { author: maxAuthor, likes: authorsLikes[maxAuthor] };
};

module.exports = {
  dummy,
  totalLikes,
  favourite,
  mostBlogs,
  mostLikes,
};
