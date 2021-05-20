import React, { useState } from "react";
import loginService from "../services/login";
import blogsService from "../services/blogs";

const Login = ({ setUser, makeNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login(username, password);
      setUser(user);
      localStorage.setItem("userLoggedInfo", JSON.stringify(user));
      blogsService.setToken(user.token);
    } catch (exception) {
      makeNotification("Wrong credentials, wrong username or password", true);
    }
  };

  return (
    <div>
      <h2>Login into app</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default Login;
