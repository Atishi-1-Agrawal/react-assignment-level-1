import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json";

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((u) => u.id.toString() === id);
        setUser(found);
      });
  }, [id]);

  if (!user) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <ul className="list-disc list-inside">
        {Object.entries(user).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back
      </button>
    </div>
  );
}

export default UserDetail;