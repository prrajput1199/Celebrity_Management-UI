
import React, { useState, useEffect } from "react";
import UserAccordion from "./Components/UserAccordion";

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetch("celebrities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setUsers(data);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUserId(null);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const filteredUsers = users.filter((user) =>{
    return user.first.toLowerCase().includes(searchTerm.toLowerCase()) || user.last.toLowerCase().includes(searchTerm.toLowerCase())
  }
  );

  return (
    <div className="container flex mx-auto p-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold mb-4">Celebrity Management</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4 p-2 border rounded w-full"
        />
        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <UserAccordion
              key={user.id}
              user={user}
              isEditing={editingUserId === user.id}
              onEdit={() => setEditingUserId(user.id)}
              onUpdate={handleUpdateUser}
              onDelete={handleDeleteUser}
              onCancel={() => setEditingUserId(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
