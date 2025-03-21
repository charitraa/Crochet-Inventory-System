import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { AppContext } from "../../context/ContextApp";
import useGet from "../../customHooks/useGet";
import { NavLink, useNavigate } from "react-router-dom";
import useDelete from "../../customHooks/useDelete";

const ViewCategory = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { newData: categories, isLoading } = useGet("category/all/");
  const navigate = useNavigate()
  const { handleDelete } = useDelete();
  const { showToast } = useContext(AppContext);



  // Filtered category list
  const filteredCategories = categories?.filter(category =>
    (filter === "all" || category.type === filter) &&
    category.name.toLowerCase().includes(search.toLowerCase())
  );
  const Delete = async (e, id) => {
    e.preventDefault();

    try {
      const check = await handleDelete(`category/delete/${id}/`); // Wait for response

      if (check) {
        showToast("Category deleted successfully", "success");

        // Update UI without refreshing the page
        window.location.reload();
      } else {
        showToast("Failed to delete category", "error");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
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
              label="Search Categories..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%" }}
            />

            {/* Filter & Add Button */}
            <div style={{ display: "flex", gap: "16px" }}>
              <TextField
                select
                label="Filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                variant="outlined"
                style={{ width: "150px" }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home</MenuItem>
              </TextField>
              <Button variant="contained" color="primary" onClick={() => navigate("/app/add-category")}>+ New Category</Button>


            </div>
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
                    <TableCell><b>Category ID</b></TableCell>
                    <TableCell><b>Category Name</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                    {/* <TableCell><b>Status</b></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories?.length > 0 ? (
                    filteredCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell style={{ display: "flex", gap: "8px" }}>
                          <Button size="small">✏️</Button>
                          <Button size="small" color="error" onClick={(e) => Delete(e, category.id)}>🗑️</Button>
                        </TableCell>
                        {/* <TableCell>{category.products_count}</TableCell>
                        <TableCell style={{ color: category.is_active ? "green" : "red" }}>
                          {category.is_active ? "Active" : "Inactive"}
                        </TableCell> */}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                        No categories found.
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

export default ViewCategory;
