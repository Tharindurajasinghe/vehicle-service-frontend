import { useState, useEffect } from "react";
import { getAllServices, createService, deleteService } from "../api/serviceApi";
import toast from "react-hot-toast";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    try {
      const res = await getAllServices();
      setServices(res.data);
    } catch {
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createService(form);
      toast.success("Service category added");
      setForm({ name: "", description: "" });
      fetchServices();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add service");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service category?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      fetchServices();
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div>
          <h1 style={styles.title}>Service Categories</h1>
          <p style={styles.sub}>Manage the services available for booking</p>
        </div>

        <div style={styles.grid}>
          {/* Add form */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Add New Category</h2>
            <form onSubmit={handleAdd} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Service Name *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Oil Change"
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Short description..."
                  rows={3}
                  style={{ ...styles.input, resize: "vertical" }}
                />
              </div>
              <button type="submit" disabled={loading} style={styles.addBtn}>
                {loading ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>

          {/* Services list */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              Current Categories
              <span style={styles.count}>{services.length}</span>
            </h2>
            {services.length === 0 ? (
              <p style={styles.empty}>No service categories yet. Add one.</p>
            ) : (
              <div style={styles.list}>
                {services.map((s) => (
                  <div key={s._id} style={styles.serviceItem}>
                    <div>
                      <div style={styles.serviceName}>{s.name}</div>
                      {s.description && (
                        <div style={styles.serviceDesc}>{s.description}</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(s._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#0a0a10",
    padding: "40px 24px",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#f1f5f9",
    fontFamily: "'Georgia', serif",
    margin: "0 0 4px",
  },
  sub: {
    color: "#64748b",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  card: {
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "12px",
    padding: "28px",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#e2e8f0",
    fontFamily: "'Georgia', serif",
    margin: "0 0 20px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  count: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "22px",
    height: "22px",
    backgroundColor: "#1e1e2e",
    borderRadius: "50%",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "400",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
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
    padding: "10px 13px",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  addBtn: {
    padding: "11px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  serviceItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    backgroundColor: "#0f0f13",
    border: "1px solid #1e1e2e",
    borderRadius: "8px",
  },
  serviceName: {
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    fontWeight: "500",
  },
  serviceDesc: {
    color: "#64748b",
    fontSize: "12px",
    fontFamily: "'Georgia', serif",
    marginTop: "2px",
  },
  deleteBtn: {
    padding: "5px 10px",
    backgroundColor: "transparent",
    border: "1px solid #2d2d3d",
    borderRadius: "5px",
    color: "#64748b",
    fontSize: "12px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
  },
  empty: {
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    fontSize: "14px",
    textAlign: "center",
    padding: "20px 0",
  },
};

export default ServicesPage;
