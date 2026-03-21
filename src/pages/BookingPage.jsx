import BookingForm from "../components/BookingForm";

const BookingPage = () => {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.tag}>Online Booking</div>
          <h1 style={styles.title}>Book a Service Appointment</h1>
          <p style={styles.subtitle}>
            Fill in your details below and our team will confirm your appointment.
          </p>
        </div>
        <div style={styles.card}>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 64px)",
    backgroundColor: "#0a0a10",
    padding: "48px 24px",
  },
  container: {
    maxWidth: "680px",
    margin: "0 auto",
  },
  header: {
    marginBottom: "32px",
  },
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
  card: {
    backgroundColor: "#161622",
    borderRadius: "12px",
    border: "1px solid #1e1e2e",
    padding: "32px",
  },
};

export default BookingPage;
