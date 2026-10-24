const BASE = "http://localhost:5000";

export async function login({ email, password, role }) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
}

export async function fetchDashboard(token) {
  const res = await fetch(`${BASE}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Session expired");
  return res.json();
}