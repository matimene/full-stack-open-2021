import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { initializeBlogs, sortByLikes } from "./reducers/blogReducer";
import { fetchLocalUser } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import Blog from "./components/Blog";
import Togglable from "./components/Togglable";
import UserList from "./components/UsersList";
import User from "./components/User";
import Notification from "./components/Notification";
import Login from "./components/Login";
import NavigationMenu from "./components/NavigationMenu";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const classes = useStyles();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
    dispatch(fetchLocalUser());
  }, [dispatch]);

  if (!user) {
    return (
      <>
        <NavigationMenu />
        <Notification />
        <Login />
      </>
    );
  }

  return (
    <Router>
      <NavigationMenu />
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/">
          <div className={classes.root}>
            <Togglable buttonLabel="New blog" ref={blogFormRef}>
              <BlogForm />
            </Togglable>
            <Button
              variant="contained"
              color="primary"
              id="sort-button"
              onClick={() => dispatch(sortByLikes())}
            >
              sort by likes
            </Button>
            <BlogList />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
