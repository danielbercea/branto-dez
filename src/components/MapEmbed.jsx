export default function MapEmbed() {
  return (
    <div className="card" style={{ height: 420 }}>
      <iframe
        title="Branto-Dez – Sibiu"
        src="https://www.google.com/maps?q=Sibiu&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
