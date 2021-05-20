import usersService from "../services/users";

const reducer = (state = null, action) => {
  switch (action.type) {
    case "INITIALIZE_USERS":
      return action.payload;
    default:
      return state;
  }
};

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll();
    dispatch({
      type: "INITIALIZE_USERS",
      payload: users,
    });
  };
};

export default reducer;
