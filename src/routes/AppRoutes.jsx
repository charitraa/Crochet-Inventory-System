import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/NotFound";
import Materials from "../pages/materials/Materials";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Orders from "../pages/orders/Orders";
import Purchase from "../pages/purchase/Purchase";
import Users from "../pages/users/Users";
import AddMaterials from "../pages/materials/AddMaterial";
import AddOrders from "../pages/orders/addorder";
import ProtectedRoute from "./ProtectedRoute";
import { AppContext } from "../context/ContextApp";
import AddCategory from "../pages/category/AddCategory";
import UserDashboard from "../components/dashboard/UserDashboard";
import Authorizations from "../components/Authorizations";
import ViewCategory from "../pages/category/ViewCategory";
import Product from "../pages/products/Products";
import MyProfile from "../pages/profile/MyProfile";
import ProductList from "../pages/products/ProductList";
import AddUser from "../pages/users/AddUser";
import ViewPurchaseMaterials from "../pages/purchase/ViewPurchaseMaterials";
import EditCategory from "../pages/category/EditCategory";
import EditMaterials from "../pages/materials/EditMaterials";
import EditUser from "../pages/users/EditUser";
import EditProducts from "../pages/products/Edit_Product";
import EditPurchaseMaterials from "../pages/purchase/EditPurchaseMaterials";

export default function AppRoutes() {
  const { isAuthenticated } = useContext(AppContext);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/authorization" element={<Authorizations />} />



      {/* Protected Routes */}
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/app/dashboard" element={<Home />} />
        <Route path="/app/materials" element={<Materials />} />
        <Route path="/app/add-materials" element={<AddMaterials />} />
        <Route path="/app/orders" element={<Orders />} />
        <Route path="/app/add-orders" element={<AddOrders />} />
        <Route path="/app/add-category" element={<AddCategory />} />
        <Route path="/app/add-products" element={<Product />} />
        <Route path="/app/products" element={<ProductList />} />
        <Route path="/app/users" element={<Users />} />
        <Route path="/app/add-users" element={<AddUser />} />
        <Route path="/app/add-purchase" element={<Purchase />} />
        <Route path="/app/userdashboard" element={<UserDashboard />} />
        <Route path="/app/category" element={<ViewCategory />} />
        <Route path="/app/myprofile" element={<MyProfile />} />
        <Route path="/app/purchase" element={<ViewPurchaseMaterials />} />
        <Route path="/app/edit-category/:id" element={<EditCategory />} />
        <Route path="/app/edit-material/:id" element={<EditMaterials />} />
        <Route path="/app/edit-user/:id" element={<EditUser />} />
        <Route path="/app/edit-product/:id" element={<EditProducts />} />
        <Route path="/app/edit-purchase/:id" element={<EditPurchaseMaterials />} />

      </Route>
    </Routes>
  );
}
