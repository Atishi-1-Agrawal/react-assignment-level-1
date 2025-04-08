import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const API_URL = "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === "string") return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <UserTable
        users={paginatedUsers}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
        navigate={navigate}
      />
      <Pagination
        totalPages={Math.ceil(sortedUsers.length / USERS_PER_PAGE)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default UsersPage;