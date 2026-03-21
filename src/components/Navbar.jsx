import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <div style={styles.logo}>F</div>
        <span style={styles.brandName}>Fuchsius Service</span>
      </div>

      <div style={styles.links}>
        <Link to="/" style={{ ...styles.link, ...(isActive("/") ? styles.activeLink : {}) }}>
          Book Service
        </Link>

        {admin && (
          <>
            <Link
              to="/dashboard"
              style={{ ...styles.link, ...(isActive("/dashboard") ? styles.activeLink : {}) }}
            >
              Dashboard
            </Link>
            <Link
              to="/services"
              style={{ ...styles.link, ...(isActive("/services") ? styles.activeLink : {}) }}
            >
              Services
            </Link>
            <span style={styles.username}>Hi, {admin.username}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        )}

        {!admin && (
          <Link to="/login" style={styles.loginBtn}>
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    height: "64px",
    backgroundColor: "#0f0f13",
    borderBottom: "1px solid #1e1e2e",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #a855f7, #7c3aed)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "16px",
    color: "#fff",
    fontFamily: "'Georgia', serif",
  },
  brandName: {
    fontFamily: "'Georgia', serif",
    fontSize: "17px",
    fontWeight: "600",
    color: "#e2e8f0",
    letterSpacing: "0.01em",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  link: {
    padding: "6px 14px",
    borderRadius: "6px",
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    transition: "all 0.15s ease",
  },
  activeLink: {
    color: "#e2e8f0",
    backgroundColor: "#1e1e2e",
  },
  username: {
    fontSize: "13px",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    marginLeft: "8px",
  },
  loginBtn: {
    padding: "7px 16px",
    borderRadius: "6px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    textDecoration: "none",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
  },
  logoutBtn: {
    padding: "7px 14px",
    borderRadius: "6px",
    backgroundColor: "transparent",
    border: "1px solid #2d2d3d",
    color: "#94a3b8",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
};

export default Navbar;
