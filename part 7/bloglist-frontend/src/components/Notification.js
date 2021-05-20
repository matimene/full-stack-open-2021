import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const { message, isError } = notification;

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

  if (!message) {
    return null;
  }
  return (
    <div style={notificationStyle} id="notification">
      {message}
    </div>
  );
};

export default Notification;
