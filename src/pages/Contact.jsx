import { useState } from "react";
import MapEmbed from "../components/MapEmbed.jsx";
import FacebookLink from "../components/FacebookLink.jsx";


export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const isDev = import.meta?.env?.DEV;

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setLoading(true);

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name || !email || !message) {
      setLoading(false);
      setStatus("Te rog completează toate câmpurile.");
      return;
    }

    // ✅ LOCAL DEV: nu există contact.php -> folosim mailto
    if (isDev) {
      const subject = encodeURIComponent("Mesaj nou de pe branto-dez.ro");
      const body = encodeURIComponent(
        `Nume: ${name}\nEmail: ${email}\n\nMesaj:\n${message}\n`
      );
      window.location.href = `mailto:brantodez@gmail.com?subject=${subject}&body=${body}`;
      setLoading(false);
      setStatus("DEV: s-a deschis clientul tău de email (mailto).");
      return;
    }

    // ✅ PROD: trimite către contact.php (pe Hostico)
    try {
      const res = await fetch("/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setStatus(data?.error || `Eroare server (HTTP ${res.status}).`);
        setLoading(false);
        return;
      }

      if (data?.success) {
        setStatus("Mesaj trimis cu succes ✔");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data?.error || "Eroare la trimitere.");
      }
    } catch {
      setStatus("Eroare server. Verifică contact.php pe Hostico.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: "40px 20px" }}>
      <h1 className="section-title">Contact</h1>

      <div className="grid" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Date contact</h3>

            <p className="card-text">
              📞 <a href="tel:+40766315255">0766 315 255</a>
            </p>

            <p className="card-text">
              💬{" "}
              <a
                href="https://api.whatsapp.com/send?phone=40766315255"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </p>

            <p className="card-text">
              📧 <a href="mailto:brantodez@gmail.com">brantodez@gmail.com</a>
            </p>

            <div className="cta" style={{ justifyContent: "flex-start" }}>
              <a
                className="btn btn-primary"
                href="https://api.whatsapp.com/send?phone=40766315255"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
              <a className="btn" href="tel:+40766315255">
                Sună
              </a>
              <a className="btn" href="mailto:brantodez@gmail.com">
                Email
              </a>
              <a
  className="btn"
  style={{ background: "#1877F2", color: "#fff" }}
  href="https://www.facebook.com/share/1abW8r3jJw/"
  target="_blank"
  rel="noopener noreferrer"
>
  Facebook
</a>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Trimite un mesaj</h3>

            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: 12, marginTop: 10 }}
            >
              <input
                name="name"
                type="text"
                placeholder="Nume"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                placeholder="Mesaj"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Se trimite..." : "Trimite"}
              </button>

              {status && (
                <p className="card-text" style={{ margin: 0 }}>
                  {status}
                </p>
              )}
            </form>

            {isDev && (
              <p className="card-text" style={{ marginTop: 10 }}>
                * Local: formularul deschide mailto. Pe Hostico va trimite email real prin
                <b> contact.php</b>.
              </p>
            )}
          </div>
        </div>
      </div>

      <MapEmbed />
    </div>
  );
}
