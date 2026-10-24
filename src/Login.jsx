import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", role: "student" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const data = await login(form);
      localStorage.setItem("cc_token", data.token);
      localStorage.setItem("cc_user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrap}>
      <form onSubmit={submit} style={styles.card}>
        <h2 style={{ margin: 0, color: "#1e3a8a" }}>CampusCare</h2>
        <p style={{ color: "#64748b", marginTop: 4 }}>
          From Issues, To Actions
        </p>

        <label style={styles.label}>Role</label>
        <select name="role" value={form.role} onChange={onChange} style={styles.input}>
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="authority">Authority</option>
        </select>

        <label style={styles.label}>College Email</label>
        <input
          name="email" type="email" required
          placeholder="you@college.edu"
          value={form.email} onChange={onChange}
          style={styles.input}
        />

        <label style={styles.label}>Password</label>
        <input
          name="password" type="password" required
          value={form.password} onChange={onChange}
          style={styles.input}
        />

        {err && <p style={{ color: "#dc2626", fontSize: 14 }}>{err}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Verifying..." : "Secure Login"}
        </button>

        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
          Demo: nikita@college.edu / Campus@123
        </p>
      </form>
    </div>
  );
}

const styles = {
  wrap: {
    minHeight: "100vh", display: "grid", placeItems: "center",
    background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
  },
  card: {
    width: 360, background: "#fff", padding: 32, borderRadius: 14,
    display: "flex", flexDirection: "column", gap: 8,
    boxShadow: "0 20px 60px rgba(0,0,0,.35)",
  },
  label: { fontSize: 13, fontWeight: 600, color: "#334155", marginTop: 8 },
  input: {
    padding: "10px 12px", borderRadius: 8,
    border: "1px solid #cbd5e1", fontSize: 14, outline: "none",
  },
  button: {
    marginTop: 16, padding: "12px", borderRadius: 8, border: "none",
    background: "#1e3a8a", color: "#fff", fontWeight: 600,
    fontSize: 15, cursor: "pointer",
  },
};
