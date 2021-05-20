const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

const getToken = async () => {
  const testCredentials = { username: "Testing123", password: "password" };
  const loggedUser = await api
    .post("/api/login")
    .send(testCredentials)
    .expect(200);

  return loggedUser.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  // const passwordHash = await bcrypt.hash("sekret", 10);
  // const user = new User({ username: "root", passwordHash });
  // await user.save();

  const userForTest = {
    username: "Testing123",
    password: "password",
    name: "Test123",
  };
  await api.post("/api/users").send(userForTest);
  const user = await User.findOne({ username: userForTest.username });

  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id.toString() })
  );
  const promisesArrBlogs = blogObjects.map((blog) => blog.save());
  await Promise.all(promisesArrBlogs);
});

describe("when there is initially some blogs saved", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are three blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });
});

describe("basic REST requests", () => {
  test("HTTP POST request working properly", async () => {
    const newBlog = {
      title: "Testing the database",
      author: "Myself Ofc",
      url: "www.workitout.com",
      likes: 45,
    };

    const token = await getToken();

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((b) => b.title);
    expect(contents).toContain("Testing the database");
  });

  test("HTTP POST failing with 401:UNAUTHORIZED when token is not provided", async () => {
    const newBlog = {
      title: "Testing the database",
      author: "Myself Ofc",
      url: "www.workitout.com",
      likes: 45,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
  });

  test("HTTP DELETE request working properly", async () => {
    const blogsAtBeginning = await helper.blogsInDb();
    const lastId = blogsAtBeginning.map((b) => b.id).slice(-1);

    const token = await getToken();
    await api
      .delete(`/api/blogs/${lastId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
  });

  test("HTTP PUT requests working properly", async () => {
    const blogsAtBeginning = await helper.blogsInDb();
    const lastId = blogsAtBeginning.map((b) => b.id).slice(-1);

    const token = await getToken();
    await api
      .put(`/api/blogs/${lastId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ likes: 987654 });

    const blogsAtEnd = await helper.blogsInDb();
    const lastLike = blogsAtEnd.map((b) => b.likes).slice(-1)[0];

    expect(lastLike).toEqual(987654);
  });
});

describe("property specifics", () => {
  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((blog) => blog.id);

    expect(ids).toBeDefined();
  });

  test("if property likes is missing from the request, it defaults to 0", async () => {
    const token = await getToken();

    const newBlog = {
      title: "Testing the database",
      author: "Myself Ofc",
      url: "www.workitout.com",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    const [lastItemLikes] = blogsAtEnd.map((b) => b.likes).slice(-1);

    expect(lastItemLikes).toBe(0);
  });

  test("if title and url properties are missing, server responds with status code 400 bad request", async () => {
    const token = await getToken();

    const newBlog = {
      url: "www.workitout.com",
      likes: 12,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
