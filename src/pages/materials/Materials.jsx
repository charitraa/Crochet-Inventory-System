import React, { useContext, useEffect, useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import { TextField, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { AppContext } from "../../context/ContextApp";
import useGet from "../../customHooks/useGet";
import { NavLink, useNavigate } from "react-router-dom";

const Materials = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const { newData: materials, isLoading } = useGet("material/all/");
  const navigate = useNavigate()

  // Filtered material list
  const filteredmaterials = materials?.filter(material =>
    (filter === "all" || material.type === filter) &&
    material.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dashboard
      mainContent={
        <div style={{ padding: "24px", background: "white", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          {/* Header Section */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            {/* Search Input */}
            <TextField
              label="Search materials..."
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
                <MenuItem value="all">All Materials</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="home">Home</MenuItem>
              </TextField>
              <Button variant="contained" color="primary" onClick={() => navigate("/app/add-materials")}>+ New material</Button>


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
                    <TableCell><b>Material ID</b></TableCell>
                    <TableCell><b>Material Name</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                    {/* <TableCell><b>Products</b></TableCell>
                    <TableCell><b>Status</b></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredmaterials?.length > 0 ? (
                    filteredmaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.id}</TableCell>
                        <TableCell>{material.name}</TableCell>
                        {/* <TableCell>{material.products_count}</TableCell>
                        <TableCell style={{ color: material.is_active ? "green" : "red" }}>
                          {material.is_active ? "Active" : "Inactive"}
                        </TableCell> */}
                        <TableCell style={{ display: "flex", gap: "8px" }}>
                          <Button size="small">✏️</Button>
                          <Button size="small" color="error">🗑️</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: "center", padding: "20px" }}>
                        No materials found.
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

export default Materials;
