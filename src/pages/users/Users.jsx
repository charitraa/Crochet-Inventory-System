import React, { useContext, useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGet from "../../customHooks/useGet"; // Fetch users dynamically
import useDelete from "../../customHooks/useDelete";
import { AppContext } from "../../context/ContextApp";

const Users = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { handleDelete } = useDelete();

  // Fetch users from API
  const { newData: users, isLoading } = useGet("user/all/");
  const { showToast } = useContext(AppContext);


  // Filter users based on search input
  const filteredUsers = users?.filter((user) =>
    user.full_name?.toLowerCase().includes(search.toLowerCase())
  );
  const Delete = async (e, id) => {
    e.preventDefault();

    try {
      const check = await handleDelete(`user/delete/${id}/`); // Wait for response

      if (check) {
        showToast("users deleted successfully", "success");

        // Update UI without refreshing the page
        window.location.reload();
      } else {
        showToast("Failed to delete users", "error");
      }
    } catch (error) {
      showToast("Something went wrong!", "error");
    }
  };

  return (
    <Dashboard
      mainContent={
        <div style={{ padding: "24px", background: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          {/* Header Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            {/* Search Input */}
            <TextField
              label="Search users..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%" }}
            />

            {/* Add User Button */}
            <Button variant="contained" color="primary" onClick={() => navigate("/app/add-users")}>
              + New User
            </Button>
          </div>

          {/* Table Section */}
          <TableContainer component={Paper}>
            {isLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <CircularProgress />
              </div>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell><b>Name</b></TableCell>
                    <TableCell><b>Address</b></TableCell>

                    <TableCell><b>Phone Number</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Role</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers?.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.full_name}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.phone_number}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell style={{ color: user.is_active ? "green" : "red" }}>
                          {user.is_active ? "Active" : "Inactive"}
                        </TableCell>

                        <TableCell>
                          {user.is_staff ? "Admin" : "General"}
                        </TableCell>
                        <TableCell style={{ display: "flex", gap: "8px" }}>
                          <Button size="small" onClick={() => {
                            navigate(`/app/edit-user/${user.id}`)
                          }}>✏️</Button>
                          <Button size="small" color="error" onClick={(e) => Delete(e, user.id)}>🗑️</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                        No users found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>
      }
    />
  );
};

export default Users;
