import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginAdmin } from "../api/authApi";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginAdmin(form);
      login(res.data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>F</div>
        <h1 style={styles.title}>Admin Login</h1>
        <p style={styles.sub}>Fuchsius Service Management</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="admin"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
              required
              style={styles.input}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#0a0a10",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  card: {
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "14px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
  },
  logo: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #a855f7, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "22px",
    color: "#fff",
    fontFamily: "'Georgia', serif",
    margin: "0 auto 20px",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#f1f5f9",
    fontFamily: "'Georgia', serif",
    margin: "0 0 6px",
  },
  sub: {
    color: "#64748b",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    margin: "0 0 28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "left",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "12px",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "'Georgia', serif",
  },
  input: {
    backgroundColor: "#0f0f13",
    border: "1px solid #2d2d3d",
    borderRadius: "8px",
    padding: "11px 14px",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    padding: "12px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    letterSpacing: "0.02em",
  },
};

export default LoginPage;
