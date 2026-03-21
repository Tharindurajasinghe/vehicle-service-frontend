const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Brand column */}
        <div style={styles.column}>
          <div style={styles.brand}>
            <div style={styles.logo}>F</div>
            <span style={styles.brandName}>Vehicle Service</span>
          </div>
          <p style={styles.tagline}>
            Professional vehicle service and maintenance. Keeping your vehicle
            in perfect condition since 2020.
          </p>
        </div>

        {/* About Us column */}
        <div style={styles.column}>
          <h3 style={styles.colTitle}>About Us</h3>
          <p style={styles.bodyText}>
            Fuchsius Vehicle Service Center is a trusted name in automotive
            care. We provide high-quality maintenance, repairs, and inspections
            for all vehicle types. Our certified technicians use the latest
            tools to ensure your vehicle runs at its best.
          </p>
          <div style={styles.badges}>
            <span style={styles.badge}>Certified Technicians</span>
            <span style={styles.badge}>All Vehicle Types</span>
            <span style={styles.badge}>Quality Guaranteed</span>
          </div>
        </div>

        {/* Contact Us column */}
        <div style={styles.column}>
          <h3 style={styles.colTitle}>Contact Us</h3>
          <div style={styles.contactList}>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>&#9743;</span>
              <div>
                <div style={styles.contactLabel}>Phone</div>
                <div style={styles.contactValue}>+94 77 123 4567</div>
                <div style={styles.contactValue}>+94 11 234 5678</div>
              </div>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>&#9993;</span>
              <div>
                <div style={styles.contactLabel}>Email</div>
                <div style={styles.contactValue}>info@fuchsius.com</div>
                <div style={styles.contactValue}>support@fuchsius.com</div>
              </div>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>&#9679;</span>
              <div>
                <div style={styles.contactLabel}>Address</div>
                <div style={styles.contactValue}>
                  No. 45, Galle Road, Colombo 03,
                </div>
                <div style={styles.contactValue}>Western Province, Sri Lanka</div>
              </div>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>&#9719;</span>
              <div>
                <div style={styles.contactLabel}>Working Hours</div>
                <div style={styles.contactValue}>Mon – Sat: 8:00 AM – 6:00 PM</div>
                <div style={styles.contactValue}>Sunday: 9:00 AM – 2:00 PM</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomInner}>
          <span style={styles.copyright}>
            &copy; {new Date().getFullYear()} Fuchsius Vehicle Service. All rights reserved.
          </span>
          <span style={styles.credit}>
            Your Trust Partner
          </span>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0f0f13",
    borderTop: "1px solid #1e1e2e",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 32px 36px",
    display: "grid",
    gridTemplateColumns: "1.2fr 1.8fr 1.5fr",
    gap: "48px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  // Brand
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
    flexShrink: 0,
  },
  brandName: {
    fontFamily: "'Georgia', serif",
    fontSize: "16px",
    fontWeight: "600",
    color: "#e2e8f0",
  },
  tagline: {
    fontSize: "13px",
    color: "#475569",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.7",
    margin: 0,
  },

  // Column headings
  colTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#a78bfa",
    fontFamily: "'Georgia', serif",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: 0,
  },
  bodyText: {
    fontSize: "13px",
    color: "#64748b",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.75",
    margin: 0,
  },

  // Badges
  badges: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "4px",
  },
  badge: {
    padding: "4px 10px",
    backgroundColor: "#1a0a2e",
    border: "1px solid #4c1d95",
    borderRadius: "20px",
    color: "#a78bfa",
    fontSize: "11px",
    fontFamily: "'Georgia', serif",
    letterSpacing: "0.04em",
  },

  // Contact
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  contactItem: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  contactIcon: {
    fontSize: "14px",
    color: "#7c3aed",
    marginTop: "2px",
    flexShrink: 0,
    width: "18px",
  },
  contactLabel: {
    fontSize: "11px",
    color: "#475569",
    fontFamily: "'Georgia', serif",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: "2px",
  },
  contactValue: {
    fontSize: "13px",
    color: "#94a3b8",
    fontFamily: "'Georgia', serif",
    lineHeight: "1.6",
  },

  // Bottom bar
  bottomBar: {
    borderTop: "1px solid #1a1a2a",
    padding: "16px 32px",
  },
  bottomInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  copyright: {
    fontSize: "12px",
    color: "#334155",
    fontFamily: "'Georgia', serif",
  },
  credit: {
    fontSize: "12px",
    color: "#334155",
    fontFamily: "'Georgia', serif",
  },
};

export default Footer;
