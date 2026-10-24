import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDashboard } from "./api";

export default function Dashboard() {
  const [msg, setMsg] = useState("");
  const [user] = useState(() => JSON.parse(localStorage.getItem("cc_user") || "null"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("cc_token");
    if (!token) return navigate("/");
    fetchDashboard(token).then((d) => setMsg(d.message)).catch(() => {
      localStorage.clear();
      navigate("/");
    });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ maxWidth: 600, margin: "80px auto", fontFamily: "system-ui" }}>
      <h2>Dashboard</h2>
      <p>{msg || "Loading..."}</p>
      <p><strong>Role:</strong> {user?.role}</p>
      <button onClick={logout} style={{ padding: "8px 16px", cursor: "pointer" }}>
        Logout
      </button>
    </div>
  );
}