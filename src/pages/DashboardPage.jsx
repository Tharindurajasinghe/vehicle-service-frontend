import { useState, useEffect, useCallback } from "react";
import { getAllBookings, getDashboardStats } from "../api/bookingApi";
import BookingTable from "../components/BookingTable";
import StatCard from "../components/StatCard";

const STATUSES = ["All", "Pending", "Approved", "Completed", "Rejected"];

const DashboardPage = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== "All") params.status = statusFilter;
      if (dateFilter) params.date = dateFilter;

      const [bookingsRes, statsRes] = await Promise.all([
        getAllBookings(params),
        getDashboardStats(),
      ]);
      setBookings(bookingsRes.data);
      setStats(statsRes.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, dateFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.sub}>Manage all service bookings</p>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <StatCard label="Total" value={stats?.total} color="#7c3aed" />
          <StatCard label="Pending" value={stats?.pending} color="#f59e0b" />
          <StatCard label="Approved" value={stats?.approved} color="#3b82f6" />
          <StatCard label="Completed" value={stats?.completed} color="#22c55e" />
          <StatCard label="Today" value={stats?.today} color="#ec4899" />
        </div>

        {/* Filters */}
        <div style={styles.filters}>
          <div style={styles.statusTabs}>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  ...styles.tab,
                  ...(statusFilter === s ? styles.activeTab : {}),
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={styles.dateInput}
          />
          {dateFilter && (
            <button onClick={() => setDateFilter("")} style={styles.clearBtn}>
              Clear
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div style={styles.loading}>Loading bookings...</div>
        ) : (
          <BookingTable bookings={bookings} onRefresh={fetchData} />
        )}
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
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  header: {},
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
  statsRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  statusTabs: {
    display: "flex",
    gap: "6px",
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "8px",
    padding: "4px",
  },
  tab: {
    padding: "6px 14px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "transparent",
    color: "#64748b",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  activeTab: {
    backgroundColor: "#7c3aed",
    color: "#fff",
  },
  dateInput: {
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "8px",
    padding: "7px 12px",
    color: "#e2e8f0",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    outline: "none",
  },
  clearBtn: {
    padding: "7px 12px",
    backgroundColor: "transparent",
    border: "1px solid #2d2d3d",
    borderRadius: "8px",
    color: "#94a3b8",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
  },
  loading: {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    fontSize: "14px",
  },
};

export default DashboardPage;
