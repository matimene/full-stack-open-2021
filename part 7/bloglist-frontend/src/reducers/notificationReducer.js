const reducer = (state = "", action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

let timer;

export const setNotification = (message, isError) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: { message, isError },
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, 5000);
  };
};

export default reducer;
