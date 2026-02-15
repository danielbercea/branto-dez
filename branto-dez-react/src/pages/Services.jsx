export default function Services() {
  return (
    <div className="container">
      <h1 className="section-title">Servicii</h1>
      <p className="lead">
        Oferim servicii complete DDD, adaptate tipului de spațiu și gradului de infestare.
      </p>

      <div className="grid">
        <div className="card">
          <img src="/images/gallery/book1-150x150.png" alt="Dezinsecție" />
          <div className="card-body">
            <h3 className="card-title">Dezinsecție</h3>
            <p className="card-text">
              Combatere insecte: gândaci, furnici, muște, țânțari, purici, ploșnițe etc.
            </p>
          </div>
        </div>

        <div className="card">
          <img src="/images/gallery/Pest-Control-1-150x150.jpg" alt="Dezinfecție" />
          <div className="card-body">
            <h3 className="card-title">Dezinfecție</h3>
            <p className="card-text">
              Reducere încărcătură microbiană în spații rezidențiale/comerciale/medicale.
            </p>
          </div>
        </div>

        <div className="card">
          <img src="/images/gallery/da.jpg" alt="Deratizare" />
          <div className="card-body">
            <h3 className="card-title">Deratizare</h3>
            <p className="card-text">
              Combatere rozătoare: șoareci/șobolani, monitorizare și prevenție.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
