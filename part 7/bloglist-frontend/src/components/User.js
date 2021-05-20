import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const id = useParams().id;
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <div>
        {user.blogs.map((b) => (
          <label key={b.id}>
            -.{b.title}
            <br />
          </label>
        ))}
      </div>
    </div>
  );
};

export default User;
