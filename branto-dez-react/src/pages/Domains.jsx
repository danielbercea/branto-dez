import { domains } from "../data/domains.js";
import DomainCard from "../components/DomainCard.jsx";

export default function Domains() {
  return (
    <div className="container">
      <h1 className="section-title">Domenii de aplicare</h1>
      <p className="lead">
        Intervenim în spații rezidențiale, comerciale, industriale și instituții publice.
      </p>

      <div className="grid">
        {domains.map((d) => (
          <DomainCard key={d.title} title={d.title} image={d.image} desc={d.desc} />
        ))}
      </div>
    </div>
  );
}
