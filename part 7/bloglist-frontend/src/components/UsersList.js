import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  );
};

const UserList = () => {
  const users = useSelector((state) => state.users);

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>blogs created</th>
          </tr>
          {users.map((u) => (
            <User key={u.id} user={u} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
