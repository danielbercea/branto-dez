import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("cookiesAccepted");
    if (!v) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookiesAccepted", "yes");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("cookiesAccepted", "no");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={styles.bar}>
      <div style={{ display: "grid", gap: 6 }}>
        <strong>Cookie-uri</strong>
        <span style={{ fontSize: 13, color: "#475467" }}>
          Acest site folosește cookie-uri. Continuarea navigării reprezintă acceptul dvs.
        </span>
      </div>
      <div style={styles.actions}>
        <button onClick={accept} style={styles.accept}>Accept</button>
        <button onClick={reject} style={styles.reject}>Refuz</button>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    position: "fixed",
    bottom: 20,
    right: 20,
    maxWidth: 460,
    background: "#fff",
    border: "1px solid #e6e8ec",
    padding: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    zIndex: 9999,
    borderRadius: 14,
    display: "flex",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: { display: "flex", gap: 8, flexWrap: "wrap" },
  accept: {
    background: "#3c85c4",
    color: "#fff",
    border: "1px solid #3c85c4",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },
  reject: {
    background: "#fff",
    color: "#111",
    border: "1px solid #d0d5dd",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },
};
