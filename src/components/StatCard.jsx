const StatCard = ({ label, value, color }) => {
  const accent = color || "#7c3aed";

  return (
    <div style={{ ...styles.card, borderTop: `3px solid ${accent}` }}>
      <div style={{ ...styles.value, color: accent }}>{value ?? "—"}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#161622",
    borderRadius: "10px",
    padding: "24px 20px",
    border: "1px solid #1e1e2e",
    minWidth: "140px",
    flex: 1,
  },
  value: {
    fontSize: "36px",
    fontWeight: "700",
    fontFamily: "'Georgia', serif",
    lineHeight: 1,
    marginBottom: "8px",
  },
  label: {
    fontSize: "12px",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontFamily: "'Georgia', serif",
  },
};

export default StatCard;
