import React, { useState } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import {
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useGet from "../../customHooks/useGet"; // Fetch purchase materials dynamically

const ViewPurchaseMaterials = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  // Fetch purchase materials from API
  const { newData: materials, isLoading } = useGet("purchase_material/all/");

  // Filter materials based on search input and category
  const filteredMaterials = materials?.filter(
    (material) =>
      material?.material.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter === "All Categories" || material?.type === categoryFilter)
  );

  return (
    <Dashboard
      mainContent={
        <div
          style={{
            padding: "24px",
            background: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          {/* Header Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            {/* Search Input */}
            <TextField
              label="Search by Material Name..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%" }}
            />

            {/* Add Material Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/app/add-purchase")}
            >
              + New Material
            </Button>
          </div>

          {/* Table Section */}
          <TableContainer component={Paper}>
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <Table>
                <TableHead style={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>
                      <b>Material Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Type</b>
                    </TableCell>
                    <TableCell>
                      <b>Color</b>
                    </TableCell>
                    <TableCell>
                      <b>Size</b>
                    </TableCell>
                    <TableCell>
                      <b>Quantity</b>
                    </TableCell>
                    <TableCell>
                      <b>Price</b>
                    </TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredMaterials?.length > 0 ? (
                    filteredMaterials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell>{material.material}</TableCell>
                        <TableCell>{material.type || 'none'}</TableCell>
                        <TableCell>{material.color || 'none'}</TableCell>
                        <TableCell>{material.size || 'none'}</TableCell>
                        <TableCell>{material.quantity}</TableCell>
                        <TableCell>Rs.{material.price}</TableCell>

                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        style={{ textAlign: "center", padding: "20px" }}
                      >
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

export default ViewPurchaseMaterials;
