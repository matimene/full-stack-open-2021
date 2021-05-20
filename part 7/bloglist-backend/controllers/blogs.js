const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = request.user;

  if (!request.token) {
    response.status(401).json({
      error: "Unauthorized",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
    comments: [],
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findOneAndUpdate(
    { _id: request.params.id },
    { likes: request.body.likes },
    {
      new: true,
      runValidators: true,
    }
  );

  response.json(updatedBlog);
});

blogsRouter.put("/:id/comments", async (request, response) => {
  const blog = {
    comments: request.body.comments,
  };
  console.log(request.body);

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  response.json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = request.user;

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);

    response.status(204).end();
  } else {
    response.status(401).json({
      error: "Unauthorized: only user creator can delete a blog post",
    });
  }
});

module.exports = blogsRouter;
