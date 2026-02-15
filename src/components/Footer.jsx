export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} branto-dez.ro</div>
        <div>Dezinsecție · Dezinfecție · Deratizare — Sibiu </div>
        <div style={{ marginTop: 15 }}>
  <a
    href="https://www.facebook.com/share/1abW8r3jJw/"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "#1877F2", fontWeight: 600 }}
  >
    Urmărește-ne pe Facebook
  </a>
</div>

      </div>
    </footer>
  );
}
