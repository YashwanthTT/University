function StudentCard({ name = "VAIBHAV.S", usn = "24BBTCS281", program = "Btech CSE", dob = "01/05/2006", photoUrl }) {
  return (
    <div style={styles.card}>
      <div style={styles.notch} />
      <div style={styles.header}>
        <div style={styles.logoWrap}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M16 4 C11 8 7 10 6 14 C6 18 9 20 13 21 L13 17 L18 21 L13 22 C14.5 23 17 23.5 20 22 C23 20.5 26 17 26 12 C24 15 22 16 20 16 C22 13 20 8 16 4Z" fill="#0e9f93" />
            <text x="7" y="28" fontSize="5.5" fontWeight="700" fill="#0e9f93" letterSpacing="0.5">CMRU</text>
          </svg>
        </div>
        <span style={styles.universityText}>CMR UNIVERSITY</span>
      </div>
      <div style={styles.avatarRing}>
        {photoUrl ? (
          <img src={photoUrl} alt={name} style={styles.avatarImg} />
        ) : (
          <div style={styles.avatarPlaceholder}>
            <svg viewBox="0 0 100 100" width="100%" height="100%" aria-hidden>
              <circle cx="50" cy="38" r="22" fill="#c2c8d0" />
              <ellipse cx="50" cy="92" rx="38" ry="28" fill="#c2c8d0" />
            </svg>
          </div>
        )}
      </div>
      <div style={styles.name}>{name}</div>
      <div style={styles.detailsRow}>
        <div style={styles.detailColLeft}>
          <div style={styles.label}>USN</div>
          <div style={styles.value}>{usn}</div>
        </div>
        <div style={styles.detailColRight}>
          <div style={styles.label}>PROGRAM</div>
          <div style={styles.value}>{program}</div>
        </div>
      </div>
      <div style={styles.dobBlock}>
        <div style={styles.label}>DOB</div>
        <div style={styles.value}>{dob}</div>
      </div>
      <div style={styles.footer}>STUDENT</div>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.06)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "22px 0 0 0",
    position: "relative",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    border: "1px solid #f0f0f0",
  },
  notch: {
    width: "44px",
    height: "10px",
    borderRadius: "999px",
    background: "#e2e6ea",
    position: "absolute",
    top: "10px",
    left: "50%",
    transform: "translateX(-50%)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "14px",
    marginBottom: "16px",
    width: "100%",
    justifyContent: "center",
    paddingLeft: "12px",
    paddingRight: "12px",
    boxSizing: "border-box",
  },
  logoWrap: { display: "flex", alignItems: "center", justifyContent: "center" },
  universityText: { fontSize: "13px", fontWeight: 700, color: "#0e9f93", letterSpacing: "0.3px" },
  avatarRing: {
    width: "118px",
    height: "118px",
    borderRadius: "50%",
    border: "2.5px solid #0e9f93",
    padding: "3px",
    background: "white",
    overflow: "hidden",
    boxSizing: "border-box",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "#eef1f4",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", display: "block" },
  name: { marginTop: "12px", fontSize: "17px", fontWeight: 800, color: "#111827", letterSpacing: "0.2px", textTransform: "uppercase" },
  detailsRow: { display: "flex", justifyContent: "space-between", width: "100%", padding: "18px 24px 0 24px", boxSizing: "border-box" },
  detailColLeft: { textAlign: "left", flex: 1 },
  detailColRight: { textAlign: "right", flex: 1 },
  label: { fontSize: "10px", fontWeight: 500, color: "#9aa0a8", letterSpacing: "0.6px", textTransform: "uppercase", marginBottom: "4px" },
  value: { fontSize: "13px", fontWeight: 700, color: "#111827", letterSpacing: "0.1px" },
  dobBlock: { textAlign: "center", marginTop: "18px", marginBottom: "18px" },
  footer: { width: "100%", background: "#0e9f93", color: "#ffffff", textAlign: "center", padding: "9px 0 10px 0", fontSize: "16px", fontWeight: 500, letterSpacing: "1.2px", marginTop: "auto" },
};

export default StudentCard;
