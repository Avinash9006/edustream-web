import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes } from "./routes";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import RegisterTenant from "./pages/users/tenantRegistration";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-tenant" element={<RegisterTenant />} />

        {/* Private routes */}
        {privateRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}

        {/* Catch-all: redirect to login */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}
