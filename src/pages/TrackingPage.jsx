import { useState } from "react";
import { trackBookingsByPhone } from "../api/bookingApi";

const STATUS_CONFIG = {
  Pending: {
    color: "#facc15",
    bg: "#1c1400",
    border: "#854d0e",
    step: 1,
    message: "Your booking has been received. Waiting for admin approval.",
  },
  Approved: {
    color: "#60a5fa",
    bg: "#0a1628",
    border: "#1d4ed8",
    step: 2,
    message: "Your appointment is confirmed. Please arrive on time.",
  },
  Completed: {
    color: "#4ade80",
    bg: "#052e16",
    border: "#166534",
    step: 3,
    message: "Your vehicle service has been completed successfully.",
  },
  Rejected: {
    color: "#f87171",
    bg: "#1c0a0a",
    border: "#991b1b",
    step: 0,
    message: "Your booking was rejected. Please contact us for details.",
  },
};

const STEPS = ["Submitted", "Approved", "Completed"];

const StatusStepper = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
  const isRejected = status === "Rejected";

  return (
    <div style={stepperStyles.wrapper}>
      {isRejected ? (
        <div style={stepperStyles.rejectedBar}>
          <span style={stepperStyles.rejectedText}>Booking Rejected</span>
        </div>
      ) : (
        <div style={stepperStyles.track}>
          {STEPS.map((label, i) => {
            const stepNum = i + 1;
            const done = config.step >= stepNum;
            const active = config.step === stepNum;
            return (
              <div key={label} style={stepperStyles.stepGroup}>
                <div style={stepperStyles.stepRow}>
                  {i > 0 && (
                    <div
                      style={{
                        ...stepperStyles.line,
                        backgroundColor: config.step > i ? config.color : "#1e1e2e",
                      }}
                    />
                  )}
                  <div
                    style={{
                      ...stepperStyles.circle,
                      backgroundColor: done ? config.color : "#1e1e2e",
                      border: `2px solid ${done ? config.color : "#2d2d3d"}`,
                      boxShadow: active ? `0 0 0 4px ${config.color}22` : "none",
                    }}
                  >
                    {done && (
                      <span style={{ fontSize: "12px", color: "#0a0a10", fontWeight: "700" }}>
                        ✓
                      </span>
                    )}
                  </div>
                </div>
                <span
                  style={{
                    ...stepperStyles.stepLabel,
                    color: done ? config.color : "#475569",
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const BookingCard = ({ booking }) => {
  const config = STATUS_CONFIG[booking.status] || STATUS_CONFIG.Pending;

  return (
    <div style={cardStyles.card}>
      {/* Card header */}
      <div style={cardStyles.header}>
        <div>
          <div style={cardStyles.vehicle}>{booking.vehicleNumber}</div>
          <div style={cardStyles.service}>{booking.serviceType}</div>
        </div>
        <span
          style={{
            ...cardStyles.badge,
            color: config.color,
            backgroundColor: config.bg,
            border: `1px solid ${config.border}`,
          }}
        >
          {booking.status}
        </span>
      </div>

      {/* Status message */}
      <div
        style={{
          ...cardStyles.statusMsg,
          borderLeft: `3px solid ${config.color}`,
          backgroundColor: config.bg,
        }}
      >
        <span style={{ color: config.color, fontSize: "13px", fontFamily: "'Georgia', serif" }}>
          {config.message}
        </span>
      </div>

      {/* Stepper */}
      <StatusStepper status={booking.status} />

      {/* Details grid */}
      <div style={cardStyles.grid}>
        <div style={cardStyles.detail}>
          <span style={cardStyles.detailLabel}>Customer</span>
          <span style={cardStyles.detailValue}>{booking.customerName}</span>
        </div>
        <div style={cardStyles.detail}>
          <span style={cardStyles.detailLabel}>Date</span>
          <span style={cardStyles.detailValue}>{booking.date}</span>
        </div>
        <div style={cardStyles.detail}>
          <span style={cardStyles.detailLabel}>Time</span>
          <span style={cardStyles.detailValue}>{booking.time}</span>
        </div>
        <div style={cardStyles.detail}>
          <span style={cardStyles.detailLabel}>Booked On</span>
          <span style={cardStyles.detailValue}>
            {new Date(booking.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
      </div>

      {booking.notes && (
        <div style={cardStyles.notes}>
          <span style={cardStyles.detailLabel}>Notes</span>
          <span style={{ ...cardStyles.detailValue, marginTop: "4px", display: "block" }}>
            {booking.notes}
          </span>
        </div>
      )}
    </div>
  );
};

const TrackingPage = () => {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    setError("");
    setBookings([]);
    setSearched(false);

    try {
      const res = await trackBookingsByPhone(phone.trim());
      setBookings(res.data);
      setSearched(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "No bookings found for this phone number"
      );
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.tag}>Service Tracker</div>
          <h1 style={styles.title}>Track Your Booking</h1>
          <p style={styles.subtitle}>
            Enter the phone number you used when booking to see your service status.
          </p>
        </div>

        {/* Search box */}
        <div style={styles.searchCard}>
          <form onSubmit={handleTrack} style={styles.searchForm}>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>&#9743;</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number  e.g. 077 123 4567"
                required
                style={styles.input}
              />
            </div>
            <button type="submit" disabled={loading} style={styles.trackBtn}>
              {loading ? "Searching..." : "Track Now"}
            </button>
          </form>
        </div>

        {/* Error state */}
        {searched && error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>&#9888;</span>
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {searched && bookings.length > 0 && (
          <div style={styles.results}>
            <div style={styles.resultsHeader}>
              <span style={styles.resultsTitle}>
                {bookings.length} booking{bookings.length > 1 ? "s" : ""} found
              </span>
              <span style={styles.resultsSub}>for {phone}</span>
            </div>
            <div style={styles.cardList}>
              {bookings.map((b) => (
                <BookingCard key={b._id} booking={b} />
              ))}
            </div>
          </div>
        )}

        {/* Empty state before search */}
        {!searched && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>&#128269;</div>
            <p style={styles.emptyText}>
              Your booking details and live status will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#0a0a10",
    padding: "48px 24px",
  },
  container: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  header: {},
  tag: {
    display: "inline-block",
    padding: "4px 12px",
    backgroundColor: "#1a0a2e",
    border: "1px solid #4c1d95",
    borderRadius: "20px",
    color: "#a78bfa",
    fontSize: "12px",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.06em",
    marginBottom: "16px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#f1f5f9",
    fontFamily: "'Georgia', serif",
    margin: "0 0 10px 0",
    lineHeight: 1.2,
  },
  subtitle: {
    color: "#64748b",
    fontSize: "15px",
    fontFamily: "'Georgia', serif",
    margin: 0,
    lineHeight: 1.6,
  },
  searchCard: {
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "12px",
    padding: "28px",
  },
  searchForm: {
    display: "flex",
    gap: "12px",
  },
  inputWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "16px",
    color: "#475569",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    backgroundColor: "#0f0f13",
    border: "1px solid #2d2d3d",
    borderRadius: "8px",
    padding: "12px 14px 12px 40px",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
  },
  trackBtn: {
    padding: "12px 28px",
    backgroundColor: "#7c3aed",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    letterSpacing: "0.02em",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#1c0a0a",
    border: "1px solid #991b1b",
    borderRadius: "8px",
    padding: "14px 18px",
    color: "#f87171",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
  },
  errorIcon: {
    fontSize: "16px",
  },
  results: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  resultsHeader: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
  },
  resultsTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#e2e8f0",
    fontFamily: "'Georgia', serif",
  },
  resultsSub: {
    fontSize: "13px",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
  },
  emptyIcon: {
    fontSize: "40px",
    marginBottom: "16px",
  },
  emptyText: {
    color: "#475569",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
  },
};

const cardStyles = {
  card: {
    backgroundColor: "#161622",
    border: "1px solid #1e1e2e",
    borderRadius: "12px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  vehicle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#f1f5f9",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.04em",
  },
  service: {
    fontSize: "13px",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    marginTop: "4px",
  },
  badge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.04em",
  },
  statusMsg: {
    padding: "12px 16px",
    borderRadius: "6px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  detailLabel: {
    fontSize: "11px",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontFamily: "'Georgia', serif",
  },
  detailValue: {
    fontSize: "13px",
    color: "#cbd5e1",
    fontFamily: "'Georgia', serif",
  },
  notes: {
    backgroundColor: "#0f0f13",
    border: "1px solid #1e1e2e",
    borderRadius: "6px",
    padding: "12px 14px",
  },
};

const stepperStyles = {
  wrapper: {
    padding: "4px 0",
  },
  track: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0px",
  },
  stepGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    flex: 1,
  },
  stepRow: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    height: "2px",
    marginRight: "-1px",
    transition: "background-color 0.3s ease",
  },
  circle: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.3s ease",
  },
  stepLabel: {
    fontSize: "11px",
    fontFamily: "'Georgia', serif",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    textAlign: "center",
  },
  rejectedBar: {
    backgroundColor: "#1c0a0a",
    border: "1px solid #991b1b",
    borderRadius: "6px",
    padding: "10px 16px",
    textAlign: "center",
  },
  rejectedText: {
    color: "#f87171",
    fontSize: "13px",
    fontFamily: "'Georgia', serif",
    fontWeight: "600",
  },
};

export default TrackingPage;
