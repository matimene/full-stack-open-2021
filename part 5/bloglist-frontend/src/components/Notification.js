import React from "react";

const Notification = ({ msg, isError }) => {
  const notificationStyle = isError
    ? {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      }
    : {
        color: "green",
        background: "white",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      };

  if (!msg) {
    return null;
  }
  return (
    <div style={notificationStyle} id="notification">
      {msg}
    </div>
  );
};

export default Notification;
