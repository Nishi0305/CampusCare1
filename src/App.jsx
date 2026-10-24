import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "Client\src\Login.jsx";
import Dashboard from "Client\src\Dashboard.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}