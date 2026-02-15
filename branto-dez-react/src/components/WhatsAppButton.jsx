export default function WhatsAppButton() {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=40766315255"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      style={styles.btn}
      title="Scrie pe WhatsApp"
    >
      💬
    </a>
  );
}

const styles = {
  btn: {
    position: "fixed",
    bottom: 22,
    left: 22,
    width: 56,
    height: 56,
    background: "#25D366",
    color: "#fff",
    fontSize: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    zIndex: 9998,
  },
};
