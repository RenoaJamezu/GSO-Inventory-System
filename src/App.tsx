import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import CreateProfile from "./pages/auth/CreateProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/create-profile" element={<CreateProfile />} />

        {/* protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}