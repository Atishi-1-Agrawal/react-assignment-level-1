import React from "react";

const UserTable = ({ users, onSort, sortKey, sortOrder, navigate }) => {
  const columns = ["first_name", "last_name", "age", "web", "email"];

  return (
    <table className="w-full border text-left">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="cursor-pointer p-2 border-b"
              onClick={() => onSort(col)}
            >
              {col.toUpperCase()} {sortKey === col ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-100">
            <td className="text-blue-600 underline cursor-pointer p-2" onClick={() => navigate(`/users/${user.id}`)}>
              {user.first_name}
            </td>
            <td className="p-2">{user.last_name}</td>
            <td className="p-2">{user.age}</td>
            <td className="p-2">
              <a href={`http://${user.web}`} target="_blank" rel="noopener noreferrer">
                {user.web}
              </a>
            </td>
            <td className="p-2">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;