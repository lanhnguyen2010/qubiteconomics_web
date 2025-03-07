import React, { useState, useMemo, useEffect } from "react";
import { useTable } from "react-table";
import "./index.css"; 
import { getUserList, addUser, updateUser, deleteUser } from "services/UserServiceClient";

const UserScreen = () => {
  const [users, setUsers] = useState([]); // Start with an empty list
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [userToDelete, setUserToDelete] = useState(null);

  // Initialize the API client (adjust the host as needed)
  // Fetch users from the API when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUserList();
        console.log("fetchUsers: ", response);
        // Assuming response.getUserList() returns an array of user objects from the protobuf message
        const fetchedUsers = response.userList.map((user) => ({
          id: user.id,
          name: user.username, // mapping username to name for display
          email: user.email,
          role: user.role,
        }));
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on the search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery) return users;
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Define columns for react-table
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div className="action-buttons">
            <button className="edit-button" onClick={() => handleEdit(row.original)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => setUserToDelete(row.original)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Create table instance
  const tableInstance = useTable({ columns, data: filteredUsers });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setFormData({ name: "", email: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setFormData({ name: "", email: "" });
  };

  // Submit handler for add/edit form that calls the API
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update existing user via API
        const response = await updateUser({
          id: editingUser.id,
          username: formData.name, // using name as username
          firstname: formData.name, // simple mapping (adjust as needed)
          lastname: "",
          email: formData.email,
          password_hash: "", // default or unchanged; adjust per your logic
          role: editingUser.role || "User",
        });
        console.log("updateUser: ", response);
        const updatedUser = {
          id: response.getUser().getId(),
          name: response.getUser().getUsername(),
          email: response.getUser().getEmail(),
          role: response.getUser().getRole(),
        };
        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
        );
      } else {
        // Add new user via API
        const response = await addUser({
          username: formData.name,
          firstname: formData.name,
          lastname: "",
          email: formData.email,
          password_hash: "",
          role: "User", // default role
        });
        console.log("addUser: ", response);
        const newUser = {
          id: response.getUser().getId(),
          name: response.getUser().getUsername(),
          email: response.getUser().getEmail(),
          role: response.getUser().getRole(),
        };
        setUsers((prev) => [...prev, newUser]);
      }
      closeModal();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for confirming deletion via API call
  const handleDeleteConfirmed = async () => {
    if (userToDelete) {
      try {
        await deleteUser(userToDelete.id);
        setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
        setUserToDelete(null);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="header-actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <button className="add-user-button" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <table {...getTableProps()} className="user-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.column.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <h2>{editingUser ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleFormSubmit} className="modal-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <button type="submit">
                {editingUser ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {userToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirm Delete</h2>
            <p>
              Are you sure you want to delete <strong>{userToDelete.name}</strong>?
            </p>
            <div className="confirm-buttons">
              <button className="delete-button" onClick={handleDeleteConfirmed}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={handleCancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserScreen;
