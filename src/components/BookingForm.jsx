import { useState, useEffect } from "react";
import { createBooking } from "../api/bookingApi";
import { getAllServices } from "../api/serviceApi";
import toast from "react-hot-toast";

const initialForm = {
  customerName: "",
  phone: "",
  vehicleNumber: "",
  serviceType: "",
  date: "",
  time: "",
  notes: "",
};

const BookingForm = () => {
  const [form, setForm] = useState(initialForm);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getAllServices()
      .then((res) => setServices(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBooking(form);
      toast.success("Booking submitted! We will confirm shortly.");
      setForm(initialForm);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {submitted && (
        <div style={styles.successBanner}>
          Booking submitted successfully! Our team will confirm your appointment.
        </div>
      )}

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Full Name *</label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="John Silva"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Phone Number *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="077 123 4567"
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Vehicle Number *</label>
          <input
            name="vehicleNumber"
            value={form.vehicleNumber}
            onChange={handleChange}
            placeholder="WP CAB-1234"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Service Type *</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            required
            style={styles.input}
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={styles.row}>
        <div style={styles.field}>
          <label style={styles.label}>Preferred Date *</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
            style={styles.input}
          />
        </div>
        <div style={styles.field}>
          <label style={styles.label}>Preferred Time *</label>
          <input
            name="time"
            type="time"
            value={form.time}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Additional Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Any specific issues or requests..."
          rows={3}
          style={{ ...styles.input, resize: "vertical" }}
        />
      </div>

      <button type="submit" disabled={loading} style={styles.submitBtn}>
        {loading ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
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
    padding: "11px 14px",
    color: "#e2e8f0",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  submitBtn: {
    padding: "13px",
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
  successBanner: {
    backgroundColor: "#052e16",
    border: "1px solid #166534",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#4ade80",
    fontSize: "14px",
    fontFamily: "'Georgia', serif",
  },
};

export default BookingForm;
