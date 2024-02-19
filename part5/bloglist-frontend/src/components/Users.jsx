import React, { useState, useEffect } from 'react';
import userService from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.getAll().then(initialUsers => {
      setUsers(initialUsers);
    });
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
