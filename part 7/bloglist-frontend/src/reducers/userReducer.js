import blogsService from "../services/blogs";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return action.payload;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login(username, password);
    localStorage.setItem("userLoggedInfo", JSON.stringify(user));
    await blogsService.setToken(user.token);
    dispatch({
      type: "LOGIN_USER",
      payload: user,
    });
  };
};

export const fetchLocalUser = () => {
  return async (dispatch) => {
    const userLocalStorage = JSON.parse(localStorage.getItem("userLoggedInfo"));
    if (userLocalStorage) {
      dispatch({
        type: "LOGIN_USER",
        payload: userLocalStorage,
      });
      blogsService.setToken(userLocalStorage.token);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem("userLoggedInfo");
    dispatch(setNotification("User logged out", false));
    dispatch({
      type: "LOGOUT_USER",
    });
  };
};

export default reducer;
