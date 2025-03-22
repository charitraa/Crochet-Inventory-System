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
import useGet from "../../customHooks/useGet"; // Fetch orders dynamically
import useDelete from "../../customHooks/useDelete";

const Orders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Orders");

  // Fetch orders from API
  const { newData: orders, isLoading } = useGet("order/all/");
  const { handleDelete } = useDelete();
  // Filter orders based on search input and status
  const filteredOrders = orders?.filter(
    (order) =>
      order.user_name?.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "All Orders" || order.status === statusFilter)
  );
  const Delete = async (e, id) => {
    e.preventDefault();

    try {
      const check = await handleDelete(`order/delete/${id}/`); // Wait for response

      if (check) {
        showToast("Materials deleted successfully", "success");

        // Update UI without refreshing the page
        window.location.reload();
      } else {
        showToast("Failed to delete Materials", "error");
      }
    } catch (error) {
      console.error("Error deleting Materials:", error);
      showToast("Something went wrong!", "error");
    }
  };
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
              label="Search by User Name..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: "30%" }}
            />

            {/* Filter Dropdown */}
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: "20%" }}
            >
              <MenuItem value="All Orders">All Orders</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>

            {/* Add Order Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/app/add-orders")}
            >
              + New Order
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
                      <b>User Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Order Date</b>
                    </TableCell>
                    <TableCell>
                      <b>Status</b>
                    </TableCell>
                    <TableCell>
                      <b>Total Price</b>
                    </TableCell>
                    <TableCell>
                      <b>Items</b>
                    </TableCell>
                    <TableCell>
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOrders?.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.user_name}</TableCell>
                        <TableCell>{new Date(order.order_date).toLocaleString()}</TableCell>
                        <TableCell
                          style={{
                            color:
                              order.status === "completed"
                                ? "green"
                                : order.status === "cancelled"
                                  ? "red"
                                  : "black",
                          }}
                        >
                          {order.status}
                        </TableCell>
                        <TableCell>Rs.{order.total_price}</TableCell>
                        <TableCell>
                          {order.items.map((item) => (
                            <div key={item.product}>
                              {item.product_name} (x{item.quantity})
                            </div>
                          ))}
                        </TableCell>
                        <TableCell style={{ display: "flex", gap: "8px" }}>
                          <Button size="small" onClick={() => {
                            navigate(`/app/edit-material/${material.id}`)
                          }}>✏️</Button>
                          <Button size="small" color="error" onClick={(e) => Delete(e, material.id)}>🗑️</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        No orders found.
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

export default Orders;
