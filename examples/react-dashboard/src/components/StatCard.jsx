import './StatCard.css';

export default function StatCard({ label, value }) {
  return (
    <article className="statcard">
      <div className="statcard__inner">
        <span className="statcard__label">{label}</span>
        <span className="statcard__value">{value}</span>
      </div>
    </article>
  );
}
