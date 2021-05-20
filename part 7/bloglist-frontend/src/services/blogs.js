import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const comment = async (id, comment) => {
  const blog = await axios.get(`${baseUrl}/${id}`);
  const newObj = { ...blog.data, comments: [...blog.data.comments, comment] };
  const request = axios.put(`${baseUrl}/${id}/comments`, newObj);
  return request.then((response) => response.data);
};

export default {
  getAll,
  getOne,
  create,
  update,
  setToken,
  deleteBlog,
  comment,
};
