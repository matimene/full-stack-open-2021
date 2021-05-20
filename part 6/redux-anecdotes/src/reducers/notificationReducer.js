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
export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: message,
    });
    clearTimeout(timer);
    timer = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, time * 1000);
  };
};

// export const setNotification = (message) => {
//   return {
//     type: "SET_NOTIFICATION",
//     payload: message,
//   };
// };

// export const clearNotification = () => {
//   return {
//     type: "CLEAR_NOTIFICATION",
//   };
// };

export default reducer;
