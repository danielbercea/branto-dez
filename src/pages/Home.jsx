export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <img className="hero-logo" src="/images/brand/logobr.png" alt="Branto-Dez" />
          <h1>Dezinsecție · Dezinfecție · Deratizare</h1>
          <p>Sibiu — intervenții rapide, substanțe avizate, personal calificat.</p>

          <div className="badges">
            <span className="badge">Substanțe avizate</span>
            <span className="badge">Intervenții profesionale</span>
            <span className="badge">Programări rapide</span>
          </div>

          <div className="cta">
            <a className="btn btn-primary" href="/contact">Contact</a>
            <a className="btn" href="/domenii">Vezi domenii</a>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Firmă specializată</h2>
        <p className="lead">
          Suntem o firmă specializată în prestarea serviciilor de <b>dezinsecție</b>, <b>dezinfecție</b> și <b>deratizare</b>.
          Punem accent pe nevoile clienților, gestionate cu grijă și responsabilitate.
          Dispunem de logistică și soluții profesionale pentru eliminarea dăunătorilor.
        </p>

        <div className="grid" style={{ marginTop: 22 }}>
          <div className="card">
            <img src="/images/gallery/Pest-Control-1-150x150.jpg" alt="Intervenții DDD" />
            <div className="card-body">
              <h3 className="card-title">Intervenții eficiente</h3>
              <p className="card-text">Planuri periodice + intervenții punctuale, adaptate spațiului.</p>
            </div>
          </div>

          <div className="card">
            <img src="/images/gallery/pest-control-staff-1-150x150.jpg" alt="Echipă" />
            <div className="card-body">
              <h3 className="card-title">Echipă & logistică</h3>
              <p className="card-text">Personal calificat, echipamente moderne, proceduri clare.</p>
            </div>
          </div>

          <div className="card">
            <img src="/images/gallery/da.jpg" alt="Control dăunători" />
            <div className="card-body">
              <h3 className="card-title">Siguranță & conformitate</h3>
              <p className="card-text">Intervenții cu grijă pentru oameni, animale și spații sensibile.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
