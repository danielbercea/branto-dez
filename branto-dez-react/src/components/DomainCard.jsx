export default function DomainCard({ title, image, desc }) {
  return (
    <article className="card">
      <img src={image} alt={title} />
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p className="card-text">{desc}</p>
      </div>
    </article>
  );
}
