import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import Materials from "../pages/materials/Materials";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Admin from "../pages/admin/admin";
import Orders from "../pages/orders/Orders";
import Products from "../pages/products/Products";
import Purchase from "../pages/purchase/Purchase";
import Users from "../pages/users/Users";
import Inbox from "../pages/inbox/inbox";
import Report from "../pages/report/Report";
import AddMaterials from "../pages/materials/AddMaterial";
import AddOrders from "../pages/orders/addorder";
import ProtectedRoute from "./ProtectedRoute";
import { AppContext } from "../context/ContextApp";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NotFound />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/app/dashboard" element={<Home />} />
        <Route path="/app/materials" element={<Materials />} />
        <Route path="/app/addmaterials" element={<AddMaterials />} />
        <Route path="/app/admins" element={<Admin />} />
        <Route path="/app/orders" element={<Orders />} />
        <Route path="/app/addorders" element={<AddOrders />} />
        <Route path="/app/products" element={<Products />} />
        <Route path="/app/users" element={<Users />} />
        <Route path="/app/reports" element={<Report />} />
        <Route path="/app/purchase" element={<Purchase />} />
        <Route path="/app/inbox" element={<Inbox />} />
      </Route>
    </Routes>
  );
}
