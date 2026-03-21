import { updateBookingStatus, deleteBooking } from "../api/bookingApi";
import toast from "react-hot-toast";

const STATUS_COLORS = {
  Pending:   { bg: "#1c1400", text: "#facc15", border: "#854d0e" },
  Approved:  { bg: "#0a1628", text: "#60a5fa", border: "#1d4ed8" },
  Completed: { bg: "#052e16", text: "#4ade80", border: "#166534" },
  Rejected:  { bg: "#1c0a0a", text: "#f87171", border: "#991b1b" },
};

const BookingTable = ({ bookings, onRefresh }) => {
  const handleStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      toast.success(`Status updated to ${status}`);
      onRefresh();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await deleteBooking(id);
      toast.success("Booking deleted");
      onRefresh();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  if (bookings.length === 0) {
    return <div style={styles.empty}>No bookings found.</div>;
  }

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            {["Customer", "Vehicle", "Service", "Date & Time", "Status", "Actions"].map(
              (h) => (
                <th key={h} style={styles.th}>
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => {
            const s = STATUS_COLORS[b.status] || STATUS_COLORS.Pending;
            return (
              <tr key={b._id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.name}>{b.customerName}</div>
                  <div style={styles.sub}>{b.phone}</div>
                </td>
                <td style={styles.td}>{b.vehicleNumber}</td>
                <td style={styles.td}>{b.serviceType}</td>
                <td style={styles.td}>
                  <div>{b.date}</div>
                  <div style={styles.sub}>{b.time}</div>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: s.bg,
                      color: s.text,
                      border: `1px solid ${s.border}`,
                    }}
                  >
                    {b.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    {b.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleStatus(b._id, "Approved")}
                          style={{ ...styles.btn, ...styles.approveBtn }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatus(b._id, "Rejected")}
                          style={{ ...styles.btn, ...styles.rejectBtn }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {b.status === "Approved" && (
                      <button
                        onClick={() => handleStatus(b._id, "Completed")}
                        style={{ ...styles.btn, ...styles.completeBtn }}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(b._id)}
                      style={{ ...styles.btn, ...styles.deleteBtn }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: {
    overflowX: "auto",
    borderRadius: "10px",
    border: "1px solid #1e1e2e",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "'Georgia', serif",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    fontSize: "11px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    backgroundColor: "#0f0f13",
    borderBottom: "1px solid #1e1e2e",
    fontWeight: "600",
  },
  tr: {
    borderBottom: "1px solid #1a1a2a",
  },
  td: {
    padding: "14px 16px",
    fontSize: "13px",
    color: "#cbd5e1",
    backgroundColor: "#161622",
    verticalAlign: "middle",
  },
  name: { color: "#e2e8f0", fontWeight: "500" },
  sub: { color: "#64748b", fontSize: "12px", marginTop: "2px" },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "20px",
    fontSize: "11px",
    fontWeight: "600",
    letterSpacing: "0.04em",
  },
  actions: { display: "flex", gap: "6px", flexWrap: "wrap" },
  btn: {
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "11px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    letterSpacing: "0.02em",
  },
  approveBtn: { backgroundColor: "#1d4ed8", color: "#bfdbfe" },
  rejectBtn:  { backgroundColor: "#991b1b", color: "#fecaca" },
  completeBtn: { backgroundColor: "#166534", color: "#bbf7d0" },
  deleteBtn:  { backgroundColor: "#1e1e2e", color: "#64748b" },
  empty: {
    padding: "40px",
    textAlign: "center",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    fontSize: "14px",
  },
};

export default BookingTable;
