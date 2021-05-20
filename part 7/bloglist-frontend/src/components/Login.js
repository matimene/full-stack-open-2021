import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { loginUser } from "../reducers/userReducer";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      dispatch(loginUser(username, password));
    } catch (exception) {
      dispatch(
        setNotification("Wrong credentials, wrong username or password", true)
      );
    }
  };

  return (
    <div>
      <Typography variant="h5" background="black" className={classes.title}>
        LOGIN INTO THE APP
      </Typography>
      <form
        className={classes.root}
        noValidate
        autoComplete="on"
        onSubmit={handleLogin}
      >
        <div>
          <TextField
            id="standard-basic"
            label="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button color="inherit" type="submit" aria-label="menu">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
